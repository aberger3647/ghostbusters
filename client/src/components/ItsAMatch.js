import React, { useState } from "react";
import profilePhoto from "../assets/profile-icon.svg";
import matchIcon from "../assets/its-a-match-heart.svg";

const ItsAMatch = (props) => {
  const [name, setName] = useState(["Jessica", "Marcus"]);

  return (
    <div className="formContainer itsAMatch">
      <h1>it's a match!</h1>
      <h2>{name[0]}</h2>
     <div className="itsAMatchImages">
        <img
        className="mediumPhoto topPhoto"
        src={profilePhoto}
        alt="match pic"
      />
      
      <img className="itsAMatchIcon" src={matchIcon} alt="heart icon" />

      <img
        className="mediumPhoto botPhoto"
        src={profilePhoto}
        alt="match pic"
      />
      </div> 
      <h2>{name[1]}</h2>
      <h5>Close</h5>
    </div>
  );
};

export default ItsAMatch;
