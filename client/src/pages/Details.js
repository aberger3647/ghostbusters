import React from 'react';
// import Review from '../components/review'
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import Header from '../components/Header'
import ProfileCard from '../components/ProfileCard'
import Review from '../components/Review'
import ItsAMatch from '../components/ItsAMatch'

const Details = () => {

    const { loading, data } = useQuery(GET_ME);
    const me = data?.me || {};
    const profile = data?.me.profile || {};
    const preference = data?.me.preference || {};
    console.log('me', me)
    console.log("profile", profile);

    // const reviews = []; 

    const openModal = () => {
        const modal = document.querySelector('.itsAMatch');
        modal.style.display = 'flex';
      };

    return (
        <>
                <ItsAMatch />
            <Header title="details" />
            <div className="exploreContainer formContainer">
                <div className="profileContainer">

                    <ProfileCard name={me.firstName} age={profile.age} gender={profile.gender} height={profile.height} bio={profile.bio} religion={profile.religion} politics={profile.politics} smoking={profile.smoking} drinking={profile.drinking} />
                    <hr />
                    <h3 className="reviewsTitle">reviews</h3>
                    <Review direction="left"/>
                    <Review direction="right"/>
                    <Review direction="left"/>
                    {/* <textarea className="reviewTextArea" placeholder="write a review.." />
                    <button>Submit</button> */}
                    <div className="matchBtnDetailContainer">
                    <button className="dislike" />
                    <button onClick={openModal} className="like" />
                    </div>
                </div>
            </div>
        </>
    )
};

export default Details;