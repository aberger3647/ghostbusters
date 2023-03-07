import React from 'react';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import Header from '../components/Header';
import ProfileCard from '../components/ProfileCard';
import { Link } from 'react-router-dom';


const Profile = () => {

    const handleLogout = () => {
        Auth.logout();
    };

    const { loading, data } = useQuery(GET_ME);
    console.log("data", data);
    const me = data?.me || {};
    const profile = data?.me.profile || {};
    const preference = data?.me.preference || {};

    console.log("profile", profile);
    console.log("preference", preference)

    if (loading) {
        return <div>Potentially app logo</div>
    }

    return (
        <>
            <Header title="my profile" />
            <div className="exploreContainer formContainer">
                <div className="profileContainer">

                    <ProfileCard name={me.firstName} age={profile.age} gender={profile.gender} height={profile.height} bio={profile.bio} religion={profile.religion} politics={profile.politics} smoking={profile.smoking} drinking={profile.drinking} />
                    <hr />

                    <h3 className="profilePreferencesTitle">Preferences</h3>

                    <div className="profilePreferences">
                        <h4>Age: {preference.minAge} to {preference.maxAge}</h4>
                        <h4>Height: {preference.minHeight} to {preference.maxHeight}</h4>
                        <h4>Religion: {preference.religion}</h4>
                        <h4>Politics: {preference.politics}</h4>
                        <h4>Smoking: {preference.smoking}</h4>
                        <h4>Drinking: {preference.drinking}</h4>
                    </div>
                    <div className="profileBtns">
                        <Link to='/createprofile'>
                        <button>Edit</button>
                        </Link>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Profile;