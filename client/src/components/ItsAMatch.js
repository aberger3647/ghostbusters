import React, { useState } from "react";
import profilePhoto from "../assets/profile-icon.svg";
import matchIcon from "../assets/its-a-match-heart.svg";

const ItsAMatch = (props) => {
  const [name, setName] = useState(["Jessica", "Marcus"]);


  const closeModal = () => {
    const modal = document.querySelector('.itsAMatch');
    modal.style.display = 'none';
  };


  return (
    <div className="formContainer itsAMatch">
      <h1>it's a match!</h1>
      <h2>{name[0]}</h2>

        <img
        className="mediumPhoto topPhoto"
        src={profilePhoto}
        alt="match pic"
      />

      <img
        className="mediumPhoto botPhoto"
        src={profilePhoto}
        alt="match pic"
      />

      <h2>{name[1]}</h2>
     <button id='close' onClick={closeModal}> <h5>Close</h5></button>
    </div>
  );
};

export default ItsAMatch;
