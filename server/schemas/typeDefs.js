// import gql
const { gql } = require('apollo-server-express');

// create typeDefs
const typeDefs = gql`

    type User {
        _id: ID!
        firstName: String!
        email: String!
        reviews: [Review]!
        image: String
        profile: Profile
        preference: Preference
    }

    type Profile {
        _id: ID
        age: Int
        gender: String
        height: String
        religion: String
        politics: String
        smoking: String
        drinking: String
        bio: String
    }

    input ProfileInput {
        age: String
        gender: String
        height: String
        religion: String
        politics: String
        smoking: String
        drinking: String
        bio: String
    }

    type Preference {
        _id: ID
        age: Int
        gender: String
        height: String
        religion: String
        politics: String
        smoking: String
        drinking: String
    }

    input PreferenceInput {
        age: String
        gender: String
        height: String
        religion: String
        politics: String
        smoking: String
        drinking: String
    }

    type Review {
        _id: ID!
        text: String!
        firstName: String!
        createdAt: String!
    }

    type Auth {
        token: ID!
        me: User
    }
  
    type Query {
        users: [User]!
        user(userId: ID!): User
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(email: String!, password: String!, firstName: String!): Auth
        addProfile(profile: ProfileInput!): Profile
        addPreference(preference: PreferenceInput!): Preference
        uploadImage(image: String): User
        addLike(userId: ID!): User
    }
`;

// export module
module.exports = typeDefs;