import React, { useState } from 'react';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import Header from '../components/Header'
import ProfileCard from '../components/ProfileCard'


const Profile = () => {



    const handleLogout = () => {
        Auth.logout();
    };

    const { loading, data } = useQuery(GET_ME);
    console.log("data", data);
    const profile = data?.me.profile || {};
    const preference = data?.me.preference || {};

    console.log("profile", profile);

    if (loading) {
        return <div>Potentially app logo</div>
    }

    return (
        <>
            <Header title="my profile" />
            <div className="exploreContainer">
                <div className="profileContainer">

                    <ProfileCard />
                    <hr />

                    <h3 className="profilePreferencesTitle">Preferences</h3>

                    {/* <h4>Age: {preference.age}</h4>
                    <h4>Height: {preference.height}</h4>
                    <h4>Religion: {preference.religion}</h4>
                    <h4>Politics: {preference.politics}</h4>

                    <h4>Smoking {preference.smoking}</h4>
                    <h4>Drinking {preference.drinking}</h4> */}
                    <div className="profilePreferences">
                    <h4>Age: 18-19</h4>
                    <h4>Height: 5'1" - 5'2"</h4>
                    <h4>Religion: Atheist</h4>
                    <h4>Politics: Liberal</h4>
                    <h4>Smoking: No</h4>
                    <h4>Drinking: No</h4>
                    </div>
                    <div className="profileBtns">
                    <button>Edit</button>
                    <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Profile;