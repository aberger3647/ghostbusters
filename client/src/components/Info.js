import React from 'react';

const Info = ({ name, img, gender, age, height, bio, work, religion, politics, smoking, drinking }) => {

    return (
        <div>
            <h2>{name}</h2>
            <img src={img} />
            <span>{gender}, {age}, {height}</span>

            <p>{bio}</p>
            <p>Work: {work}</p>
            <p>Religion: {religion}</p>
            <p>Politics: {politics}</p>

            <p>Smoking {smoking}</p>
            <p>Drinking {drinking}</p>
        </div>
    )
};

export default Info;