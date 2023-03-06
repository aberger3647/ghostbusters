import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import matchIcon from '../assets/matches-icon.svg';
import { useQuery } from '@apollo/client';
import { GET_IMAGE } from '../utils/queries';
import { Image } from "cloudinary-react";
import profileIcon from "../assets/profile-icon.svg";

function Footer() {
  const { loading, data } = useQuery(GET_IMAGE);
  console.log(data)
  const image = data?.me.image || "";

  const [imageId, setImageId] = useState("");
  const [path, setPath] = useState();

useEffect(() => {
  if (image) {
    setImageId(image)
  }
}, [image])

const location = useLocation();
console.log(location.pathname)
useEffect(() => {

  if (location.pathname === '/createprofile' || location.pathname === '/preferences') {
    setPath(location.pathname);
    document.body.style.margin = 0;
  } else {
    setPath('')
  }
})

  return (
    <>
    {!path ? (
      <footer id='footer'>
        <a href="/profile">
        {!imageId ? (
              <img
                src={profileIcon}
                alt="Profile icon"
              />
            ) : (
              <Image
                cloudName={process.env.REACT_APP_CLOUD_NAME}
                publicId={imageId}
              />
            )}
        </a>
        <h3><a href="/explore">explore</a></h3>
        <a href="/matches"><img src={matchIcon} alt="Matches Icon" /></a>
      </footer>

    ) : (
      <></>
    )}
    </>
  );
}

export default Footer;

{/* <a href="/signup">Sign Up</a> | 
<a href="/login">Login</a> | 
<a href="/preferences">Preferences</a> | 
<a href="/explore">Explore</a> | 
<a href="/createprofile">Profile Form</a> | 
<a href="/details">Details</a> | 
<a href="/profile">Profile</a> | 
<a href="/upload">Upload</a> |  */}