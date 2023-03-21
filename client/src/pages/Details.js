import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_REVIEW, ADD_DISLIKE, ADD_LIKE } from '../utils/mutations';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { GET_SINGLE_USER } from '../utils/queries'
import Auth from '../utils/auth';
import { GET_ME } from '../utils/queries';
import Header from '../components/Header'
import ProfileCard from '../components/ProfileCard'
import Review from '../components/Review'
import ItsAMatch from '../components/ItsAMatch'


const Details = () => {
    const navigate = useNavigate();
    const [match1, setMatch1] = useState({});
    const [match2, setMatch2] = useState({});
    const [matched, setMatched] = useState(false)
    const { userId: userParam } = useParams();
    const { loading, data } = useQuery(GET_SINGLE_USER, {
        variables: { userId: userParam },
    });

    const user = data?.user || {};
    const profile = data?.user.profile || {};

    const { loading: meLoading, data: meData } = useQuery(GET_ME);

    const me = meData?.me || {};

    useEffect(() => {
        if (!meLoading) {
            const matches = me.matches

            for (const match of matches) {
                if (match._id.includes(userParam)) {
                    setMatched(true)
                }
            }
        }
    }, [me])

    const { register, handleSubmit } = useForm();

    const [addReview, { error, data: reviewData }] = useMutation(ADD_REVIEW);
    const [addDislike, { data: dislikeData }] = useMutation(ADD_DISLIKE);
    const [addLike, { data: likeData }] = useMutation(ADD_LIKE);

    const onDislikeClick = async (event) => {
        const id = event.target.id;
        try {
            const { data } = await addDislike({
                variables: {
                    userId: id,
                },
            });
        } catch (err) {
            console.error(err);
        }
        navigate('/explore')
    };

    const onLikeClick = async (event) => {
        const id = event.target.id;

        try {
            const { data: matchData } = await addLike({
                variables: {
                    userId: id,
                }
            });

            const matches = matchData.addLike.matches;

            if (matchData.addLike.matches.length) {
                for (var i = 0; i < matches.length; i++) {
                    if (matches[i]._id.includes(me._id)) {
                        setMatch1(me);
                        setMatch2(matchData.addLike);
                        openModal();
                    }
                }
            }

        } catch (err) {
            console.error(err);
        }
        navigate('/explore')
    };

    const onSubmit = async (review, event) => {
        try {
            const result = await addReview({
                variables: {
                    userId: user._id,
                    reviewText: review.reviewText,
                },
            });
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
            <ItsAMatch me={match1} user={match2} />
            <Header title="details" />
            <div className="exploreContainer formContainer">
                <div className="profileContainer">

                    <ProfileCard name={user.firstName} age={profile.age} gender={profile.gender} height={profile.height} work={profile.work} bio={profile.bio} religion={profile.religion} politics={profile.politics} smoking={profile.smoking} drinking={profile.drinking} image={user.image} />
                    <hr />
                    <h3 className="reviewsTitle">Reviews</h3>

                    <div>
                        {user.reviews ? (
                            user?.reviews?.map((review, index) => (
                                <div key={review._id}>
                                    <Review direction={index} reviewText={review.reviewText} name={review.reviewer} image={review.image} />
                                </div>
                            ))
                        ) : (
                            <h4>No reviews yet!</h4>
                        )}
                    </div>
                    {matched ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="detailsForm">
                            <textarea className="reviewTextArea" {...register('reviewText')}
                                placeholder='Write a thoughtful, constructive review.'
                            />
                            <button type='submit' className="detailsSubmit">Submit</button>
                        </form>
                    ) : (
                        <div className="matchBtnDetailContainer">
                            <button onClick={onDislikeClick} id={user?._id} className="dislike" />
                            <button onClick={onLikeClick} className="like" />
                        </div>
                    )}
                </div>
            </div>


        </>
    );

};

export default Details;