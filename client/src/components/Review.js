import React from 'react';

const Review = ({ img, name, review }) => {

    return (
        <div>
            <img src={img} alt='Reviewer thumbnail' />
            <h4>{name}</h4>
            <h4>{review}</h4>
        </div>
    )
};

export default Review;