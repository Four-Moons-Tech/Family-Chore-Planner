const { User, Chore } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('chores');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('chores');
    },

    chore: async (parent, { role}) => {
      const params = role ? { role } : {};
      return Chore.find(params).sort({ createdAt: -1 }).filter({complete:false});
    },
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
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },


    addUser: async (parent, { input }) => {
      try {
        console.log("new user:", input)
        const user = await User.create(input);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.log("Failure adding user", error)
        throw new Error("Failure adding user")
      }
    },

    

    addChore: async (parent, { choreInput }, context) => {
      if (context.User) {
        const chore = await Chore.create(choreInput);

        await User.findOneAndUpdate(
          { _id: context.User._id },
          { $addToSet: { chores: chore._id } }
        );

        return chore;
      }
      throw AuthenticationError;
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
