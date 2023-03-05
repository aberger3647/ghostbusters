import React from 'react';
import matchIcon from '../assets/matches-icon.svg'

function Footer() {
  return (
    <footer>
      <a href="/profile"><img src={matchIcon} alt="Matches Icon" /></a>
      <h3><a href="/explore">explore</a></h3>
      <a href="/matches"><img src={matchIcon} alt="Matches Icon" /></a>
    </footer>
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