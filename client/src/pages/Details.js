import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_REVIEW } from '../utils/mutations';
import { Navigate, useParams } from 'react-router-dom';
import { GET_SINGLE_USER } from '../utils/queries'


import Auth from '../utils/auth';
import ProfileCard from '../components/ProfileCard';

const Details = () => {

    { !Auth.loggedIn() && <Navigate to='/login' /> }

    const { userId: userParam } = useParams();
    const { loading, data } = useQuery(GET_SINGLE_USER, {
        variables: { userId: userParam },
    });

    const user = data?.user || {};

    const { register, handleSubmit } = useForm();

    const [addReview, { error, data: reviewData }] = useMutation(ADD_REVIEW);
    const onSubmit = async (review, event) => {
        try {
            const result = await addReview({
                variables: {
                    userId: user._id, reviewText: review.reviewText
                },
            });
        }
        catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            {
                user &&
                <ProfileCard name={user.firstName} age={user.profile.age} gender={user.profile.gender} height={user.profile.height} bio={user.profile.bio} religion={user.profile.religion} politics={user.profile.politics} smoking={user.profile.smoking} drinking={user.profile.drinking} />
            }

            <h2>Reviews</h2>

            <div>
                {user?.reviews?.map((review) => (
                    <div key={review._id}>
                        <h4>{review.reviewText}</h4>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <textarea {...register('reviewText')}
                    placeholder='Add a review'
                />
                <input type='submit' />
            </form>
        </>
    );

};

export default Details;