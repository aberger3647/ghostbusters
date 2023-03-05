import React, { useState } from 'react';
import Auth from '../utils/auth';
import likeIcon from '../assets/heart.svg'
import dislikeIcon from '../assets/broken-heart.svg'
import profilePhoto from '../assets/profile-icon.svg'
import Header from '../components/Header'
import ItsAMatch from '../components/ItsAMatch';

const Explore = () => {
    Auth.loggedIn();

    const [gender, setGender] = useState('F')
    const [age, setAge] = useState('29')
    const [height, setHeight] = useState(`5'6"`)
    const [name, setName] = useState('Jessica')

    return (
        <>
        <ItsAMatch />
        <div className='contentContainer'>
            <Header title="explore" />
            <div className='exploreContainer'>
                <img className='explorePhoto' src={profilePhoto} alt='Profile Pic' />

                <h2 className='exploreName'>{name}</h2>
                <div className='exploreStatContainer'>
                    <h3 className="exploreStats">{gender} </h3><h3 className="exploreStats">{age}</h3> <h3 className="exploreStats">{height}</h3>
                </div>
                <div className="matchBtnContainer">
                    <button className="dislike" />
                    <button className="like" />
                </div>
            </div>
            </div>
        </>
    )
};

export default Explore;