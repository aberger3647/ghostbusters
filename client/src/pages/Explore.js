import React, { useState } from 'react';
import Auth from '../utils/auth';
import likeIcon from '../assets/heart.svg'
import dislikeIcon from '../assets/broken-heart.svg'
import profilePhoto from '../assets/profile-icon.svg'
import Header from '../components/Header'
import ItsAMatch from '../components/ItsAMatch';
import { useQuery } from '@apollo/client';
import { GET_USER, GET_SINGLE_USER } from '../utils/queries';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const Explore = () => {
    { !Auth.loggedIn() && <Navigate to='/login' /> }

    const [randomNumber, setRandomNumber] = useState(0);


    const { loading, data } = useQuery(GET_USER);

    const users = data?.users || [];

    const generateRandomNumber = () => {
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
                            <button onClick={generateRandomNumber} className="dislike" />
                            <button onClick={openModal} className="like" />
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
};

export default Explore;