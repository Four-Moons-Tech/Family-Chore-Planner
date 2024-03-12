const { User, Chore } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find({}).populate('chores');
      // console.log(users)
      return users
    },
    user: async (parent, { username }) => {
      console.log("getting user:", username)
      return User.findOne({ username })
        .populate('chores')
        .populate('children')
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
        console.log("ADD CHORE INPUT: ", input)
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
    
    //IMPORTANT!
    // this mutation needs a userId parameter because...
    // we need to find the USER not the chore...
    // and update their list of chores...
    // because when we ADD a chore, a Chore is not actually added to the database!
    // a chore subdoc is simply added to the user.

    // update typedefs!
    // update client mutations!
    // update variables in ChildProfile _completeChore
    completeChore: async (parent, { choreId, userId }) => {
      const user = await User.findById(userId)
      const choreIndex = user.chores.findIndex(c => c.choreId === choreId)
      user.chores[choreIndex].completed = true
      await user.save()
      return user.chores[choreIndex]
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
