// import gql
const { gql } = require('apollo-server-express');

// create typeDefs
const typeDefs = gql`

    type User {
        _id: ID!
        firstName: String!
        email: String!
        reviews: [Review]!
    }

    type Review {
        _id: ID!
        text: String!
        firstName: String!
    }

    type Auth {
        token: ID!
        user: User
    }
  
    type Query {
        users: [User]!
        user(userId: ID!): User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(email: String!, password: String!, firstName: String!): Auth
    }
`;

// export module
module.exports = typeDefs;