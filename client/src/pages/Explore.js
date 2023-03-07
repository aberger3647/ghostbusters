import React, { useState } from 'react';
import Auth from '../utils/auth';
import likeIcon from '../assets/heart.svg'
import dislikeIcon from '../assets/broken-heart.svg'
import profilePhoto from '../assets/profile-icon.svg'
import Header from '../components/Header'
import ItsAMatch from '../components/ItsAMatch';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER, GET_SINGLE_USER, GET_ME } from '../utils/queries';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { ADD_DISLIKE, ADD_LIKE } from '../utils/mutations';

const Explore = () => {
    { !Auth.loggedIn() && <Navigate to='/login' /> }

    const [randomNumber, setRandomNumber] = useState(0);


    const { loading, data } = useQuery(GET_USER);

    const users = data?.users || [];

    // const { loading: meLoading, data: meData } = useQuery(GET_ME);
    // console.log("data", data);
    // const me = meData?.me || {};

    const [addDislike, { data: dislikeData }] = useMutation(ADD_DISLIKE);

    const [addLike, { data: likeData }] = useMutation(ADD_LIKE);

    const onDislikeClick = async (event) => {
        const id = event.target.id;
        try {
            const { data } = await addDislike({
                variables: {
                    userId: id,
                }
            });
            console.log(data);
        } catch (err) {
            console.error(err);
        }

        const randomIndex = Math.floor(Math.random() * users.length);

        setRandomNumber(randomIndex);

    }

    const onLikeClick = async (event) => {
        const id = event.target.id;

        try {
            const { data: matchData } = await addLike({
                variables: {
                    userId: id,
                }
            });
            console.log("data", matchData);
        } catch (err) {
            console.error(err);
        }

        const randomIndex = Math.floor(Math.random() * users.length);

        setRandomNumber(randomIndex);
    }

    const openModal = () => {
        const modal = document.querySelector('.itsAMatch');
        modal.style.display = 'flex';
    };


    return (
        <>
            <ItsAMatch />
            <div className='contentContainer'>
                <Header title="explore" />
                <div className='exploreContainer'>

                    <div key={users[randomNumber]?._id} className="exploreBox">
                        <Link to={`/details/${users[randomNumber]?._id}`}>
                            <img className='explorePhoto' src={profilePhoto} alt='Profile Pic' />
                        </Link>

                        <h2 className='exploreName'>{users[randomNumber]?.firstName}</h2>
                        <div className='exploreStatContainer'>
                            <h3 className="exploreStats">{users[randomNumber]?.profile?.gender} </h3><h3 className="exploreStats">{users[randomNumber]?.profile?.age}</h3> <h3 className="exploreStats">{users[randomNumber]?.profile?.height}</h3>
                        </div>
                        <div className="matchBtnContainer">
                            <button id={users[randomNumber]?._id} key={users[randomNumber]?._id} onClick={onDislikeClick} className="dislike" />
                            <button id={users[randomNumber]?._id} onClick={onLikeClick} className="like" />
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
};

export default Explore;