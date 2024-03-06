const { User, ChildUser, Chore } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('children');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('children');
    },

    childUser: async()=> {
        return ChildUser.find().populate('chores')
    },

    childUser: async (parent, {childUsername})=>{
        return ChildUser.findOne(childUsername). populate('chores');
    },

    chore: async (parent, { childUsername }) => {
      const params = childUsername ? { childUsername } : {};
      return Chore.find(params).sort({ createdAt: -1 }).filter({complete:false});
    },
    chore: async (parent, { choreId }) => {
      return Chore.findOne({ _id: choreId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('children');
      }
      throw AuthenticationError;
    },
    
  },

  Mutation: {
    userLogin: async (parent, { username, password }) => {
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

    childUserLogin: async (parent, { childUsername, password }) => {
        const childUser = await ChildUser.findOne({ childUsername });
  
        if (!childUser) {
          throw AuthenticationError;
        }
  
        const correctPw = await childUser.isCorrectPassword(password);
  
        if (!correctPw) {
          throw AuthenticationError;
        }
  
        const token = signToken(childUser);
  
        return { token, childUser };
      },

    addUser: async (parent, { userInput }) => {
      const user = await User.create(userInput);
      const token = signToken(user);
      return { token, user };
    },

    addChildUser: async(parent, {childUserInput}) =>{
        const childUser =await ChildUser.create(childUserInput);
        const token = signToken(childUser);
      return { token, childUser };
    },

    addChore: async (parent, { choreInput }, context) => {
      if (context.childUser) {
        const chore = await Chore.create(choreInput);

        await ChildUser.findOneAndUpdate(
          { _id: context.childUser._id },
          { $addToSet: { chores: chore._id } }
        );

        return chore;
      }
      throw AuthenticationError;
    },
    
    completeChore: async (parent, { choreId }) => {
      const chore = await Chore.findOneAndUpdate(
        { _id: choreId },
        { complete: true }
      )
      return chore
    }
    
  },
};

module.exports = resolvers;
