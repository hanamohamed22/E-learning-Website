
import {DynamicStar} from 'react-dynamic-star';
import React, { Component } from 'react';

const AverageRating=(props)=>{

    const ratings=props.rating;
    
    const average=(ratings.reduce((accumulator, currentValue) =>accumulator + currentValue,0))/ratings.length;
    const averageRating=(Math.round(average * 10) / 10);




    return(
        <div className="d-flex">

            <DynamicStar
                rating={averageRating} 
                width={props.size} 
                height={props.size}
                emptyStarColor={"#C5C5C5"}
                sharpnessStar={2.2}
            />
            {props.showValue && <h5 className="mx-1">{averageRating}</h5>}

        </div>
    );
}

export default AverageRating;
