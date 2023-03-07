import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_REVIEW } from '../utils/mutations';
import { Navigate, useParams } from 'react-router-dom';
import { GET_SINGLE_USER } from '../utils/queries'

import Auth from '../utils/auth';

import { GET_ME } from '../utils/queries';
import Header from '../components/Header'
import ProfileCard from '../components/ProfileCard'
import Review from '../components/Review'
import ItsAMatch from '../components/ItsAMatch'


const Details = () => {

    const [match, setMatches] = useState()
    const { userId: userParam } = useParams();
    const { loading, data } = useQuery(GET_SINGLE_USER, {
        variables: { userId: userParam },
    });

    const user = data?.user || {};
    const profile = data?.user.profile || {};

    const { loading: meLoading, data: meData } = useQuery(GET_ME);

    const me = meData?.me || {};
    console.log('me', me)

    useEffect(() => {
        if (me) {
            
        }

    }, [me])

    const { register, handleSubmit } = useForm();

    const [addReview, { error, data: reviewData }] = useMutation(ADD_REVIEW);
    const onSubmit = async (review, event) => {
        try {
            const result = await addReview({
                variables: {
                    userId: user._id,
                    reviewText: review.reviewText,
                },
            });
            console.log('result', result)
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const openModal = () => {
        const modal = document.querySelector('.itsAMatch');
        modal.style.display = 'flex';
    };


    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            {!Auth.loggedIn() && <Navigate to='/login' />}
            <ItsAMatch />
            <Header title="details" />
            <div className="exploreContainer formContainer">
                <div className="profileContainer">

                    <ProfileCard name={user.firstName} age={profile.age} gender={profile.gender} height={profile.height} bio={profile.bio} religion={profile.religion} politics={profile.politics} smoking={profile.smoking} drinking={profile.drinking} image={user.image} />
                    <hr />
                    <h3 className="reviewsTitle">reviews</h3>

                    <div>
                        {user?.reviews?.map((review, index) => (
                            <div key={review._id}>
                                {console.log(review)}
                                {/* <h4>{review.reviewText}</h4> */}
                                <Review direction={index} reviewText={review.reviewText} name={review.reviewer} image={review.image} />
                            </div>
                        ))}
                    </div>

                    {/* <textarea className="reviewTextArea" placeholder="write a review.." />
                    <button>Submit</button> */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <textarea className="reviewTextArea" {...register('reviewText')}
                            placeholder='Add a review'
                        />
                        <button type='submit'>Submit</button>
                    </form>
                    {/* <div className="matchBtnDetailContainer">
                        <button className="dislike" />
                        <button onClick={openModal} className="like" />
                    </div> */}
                </div>
            </div>


        </>
    );

};

export default Details;