import React from 'react';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const Profile = () => {

    const handleLogout = () => {
        Auth.logout();
    };
    const { loading, data } = useQuery(GET_ME);
    const profile = data?.me.profile || {};
    const preference = data?.me.preference || {};
    console.log(profile);

    if (loading) {
        return <div>Potentially app logo</div>
    }

    return (
        <div>
            <h2>My Profile</h2>

            <p>Image here</p>

            <p>{profile.gender} {profile.age} {profile.height}</p>

            <p>{profile.bio}</p>

            <p>{profile.religion}</p>
            <p>{profile.politics}</p>
            <p>{profile.smoking}</p>
            <p>{profile.drinking}</p>


            <hr></hr>

            <h2>My Preferences</h2>

            <p>Age: {preference.age}</p>
            <p>Height: {preference.height}</p>
            <p>Religion: {preference.religion}</p>
            <p>Politics: {preference.politics}</p>

            <p>Smoking {preference.smoking}</p>
            <p>Drinking {preference.drinking}</p>

            <button>Edit</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
};

export default Profile;