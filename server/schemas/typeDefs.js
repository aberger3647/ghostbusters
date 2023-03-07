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
        likes: [User]!
        matches: [User]!
        dislikes: [User]!
    }

    type Profile {
        _id: ID
        age: Int
        gender: String
        height: String
        work: String
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
        work: String
        religion: String
        politics: String
        smoking: String
        drinking: String
        bio: String
    }

    input EditProfileInput {
        _id: ID
        age: String
        gender: String
        height: String
        work: String
        religion: String
        politics: String
        smoking: String
        drinking: String
        bio: String
    }

    type Preference {
        _id: ID
        minAge: String
        maxAge: String
        gender: String
        minHeight: String
        maxHeight: String
        religion: String
        politics: String
        smoking: String
        drinking: String
    }

    input PreferenceInput {
        minAge: String
        maxAge: String
        gender: String
        minHeight: String
        maxHeight: String
        religion: String
        politics: String
        smoking: String
        drinking: String
    }

    input EditPreferenceInput {
        _id: ID
        minAge: String
        maxAge: String
        gender: String
        minHeight: String
        maxHeight: String
        religion: String
        politics: String
        smoking: String
        drinking: String
    }

    type Review {
        _id: ID
        reviewText: String
        reviewer: String
        image: String
    }

    type Auth {
        token: ID!
        me: User
    }
  
    type Query {
        users: [User]!
        user(userId: ID!): User
        me: User
        getImage: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(email: String!, password: String!, firstName: String!): Auth
        addProfile(profile: ProfileInput!): Profile
        editProfile(profile: EditProfileInput!): Profile
        addReview(userId: ID!, reviewText: String!): User
        addPreference(preference: PreferenceInput!): Preference
        editPreference(preference: EditPreferenceInput!): Preference
        uploadImage(image: String): User
        addLike(userId: ID!): User
        addDislike(userId: ID!): User
    }
`;

// export module
module.exports = typeDefs;