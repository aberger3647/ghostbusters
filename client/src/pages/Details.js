import React from 'react';
// import Review from '../components/review'

import Auth from '../utils/auth';

const Details = () => {
    Auth.loggedIn();

    // const reviews = []; 

    return (
        <>
            {/* <Info /> */}
            <div>
                <h2>Reviews</h2>
                {/* {reviews.map((review) => <Review key={review.id} name={review.name} review={review.review} />)} */}
            </div>
        </>
    )
};

export default Details;