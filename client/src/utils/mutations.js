import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            me {
                _id
                email
                firstName
                image
            }
        }
    }
`

export const ADD_USER = gql`
    mutation addUser($firstName: String!, $email: String!, $password: String!) {
        addUser(firstName: $firstName, email: $email, password: $password) {
            token
            me {
                _id
                firstName
                email
                image
            }
        }
    }    
`

export const UPLOAD_IMAGE = gql`
    mutation uploadImage($image: String!) {
        uploadImage(image: $image) {
            image
        }
    }
`

export const ADD_PROFILE = gql`
    mutation addProfile($profile: ProfileInput!) {
        addProfile(profile: $profile) {
                _id
                age
                gender
                height
                work
                religion
                politics
                smoking
                drinking
                bio
            
        }
    }
`

export const ADD_PREFERENCE = gql`
    mutation addPreference($preference: PreferenceInput!) {
        addPreference(preference: $preference) {
                 _id
                minAge
                maxAge
                gender
                minHeight
                maxHeight
                religion
                politics
                smoking
                drinking
        }
    }
`

export const ADD_REVIEW = gql`
    mutation addReview($userId: ID!, $reviewText: String!) {
        addReview(userId: $userId, reviewText: $reviewText) {
            _id
            firstName
            email
            reviews {
                _id
                reviewText
                reviewer
                image
            }
        }
    }
`

export const ADD_LIKE = gql`
    mutation addLike($userId: ID!) {
        addLike(userId: $userId) {
            _id
        }
    }
`

export const ADD_DISLIKE = gql`
    mutation addDislike($userId: ID!) {
        addDislike(userId: $userId) {
            _id
        }
    }
`