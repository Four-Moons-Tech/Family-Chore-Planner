const { User, Chore } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('chores');
    },
    user: async (parent, { username }) => {
      console.log("getting user:", username)
      return User.findOne({ username }).populate('chores');
    },

    // chore: async (parent, { role}) => {
    //   const params = role ? { role } : {};
    //   return Chore.find(params).sort({ createdAt: -1 }).filter({complete:false});
    // },
    chore: async (parent, { choreId }) => {
      return Chore.findOne({ _id: choreId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('chore');
      }
      throw AuthenticationError;
    },
    
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      console.log("Attempting to log in user...", { email, password })
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User not found")
        // throw AuthenticationError;
      }
      
      const correctPw = await user.isCorrectPassword(password);
      
      if (!correctPw) {
        throw new Error("Incorrect password")
        // throw AuthenticationError;
      }

      console.log(user)
      const token = signToken(user);

      return { token, user };
    },


    addUser: async (parent, { username, email, password, lastName }) => {
      console.log("Adding user...", { username, email, password, lastName })
      try {
        const user = new User({
          username, 
          email, 
          password, 
          lastName, 
          children: []
        });
        await user.save()
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.log("Failure adding user", error);
        throw new Error("Failure adding user");
      }
    },

    addChild: async (parent, { username, email, password, parent_id }) => {
      console.log("Adding child...", { username, email, password, parent_id })
      try {
        const child = await User.create({ username, email, password, role: 'child' });
        const parent = await User.findOneAndUpdate(
            { _id: parent_id },
            { $push: { children: child._id } },
            { new: true }
          )
        if (!parent) throw new Error("Parent not found")
        // const token = signToken(user);
        return { parent, child };
      } catch (error) {
        console.log("Failure adding child user", error);
        throw new Error("Failure adding child user");
      }
    },


    addChore: async (parent, { input }) => {
      try {
        // const chore = await Chore.create(choreinput);
        console.log(input)
        const userWithChores = await User.findOneAndUpdate(
          { _id: input.userId },
          { $addToSet: { chores: input } },
          { new: true }
        );

        return userWithChores;

      } catch (error) {
        console.log(error)
      }
      
    },
    
    completeChore: async (parent, { choreId }) => {
      const chore = await Chore.findOneAndUpdate(
        { _id: choreId },
        { complete: true },
        { new: true }
      )
      return chore
    },

    updateUser: async (parent, { input }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: input._id },
        input,
        { new: true }
      )
      return updatedUser
    }
    
  },
};

module.exports = resolvers;
