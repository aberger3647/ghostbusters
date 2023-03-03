const { AuthenticationError } = require('apollo-server-express');
const { User, Review, Match } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }, context) => {
      return User.findOne({ _id: userId });
    },
  },

  Mutation: {
    login: async (parent, args) => {
      const user = await User.findOne({ email: args.email });

      if (!user) {
        throw new AuthenticationError('User not found by that email.');
      }

      const correctPw = await user.isCorrectPassword(args.password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password.');
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
    },
    
  },
};

module.exports = resolvers;
