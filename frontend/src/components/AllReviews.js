import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {DynamicStar} from 'react-dynamic-star';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { Component } from 'react';
import { Rating } from 'react-simple-star-rating'
import {Link ,useParams} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


function AllReviews(props) {
 
    const reviews=props.reviews;
    const [showAllReviews, setShowAllReviews] = useState(false);
 console.log(reviews)
    
    return(
        <div >


            <div className="container d-grid my-5 w-75 ">
                {(reviews&&reviews.length)?<h3>REVIEWS</h3>:<></>}
                    <div className="row p-0 ">
                    {Array.isArray(reviews) &&reviews.slice(0,6).map((obj) => {
                        return (
                        <div className="col-6 px-4 py-3  ">
                            <Card.Header
                            
                            style={{ height: "30px" }}
                            className="d-flex px-2 border-top"
                            >
                            <h6 className=" fw-bold mt-1 mb-0">{obj.author}</h6>
                            <div className="ms-auto mt-2">
                            <DynamicStar
                                rating={obj.stars}
                                width="20"
                                height="20"
                                // fullStarColor={"#000000"}
                                emptyStarColor={"#C5C5C5"}
                                sharpnessStar={2.2}
                            />
                            </div>
                            </Card.Header>
                            <Card.Body className="px-2 my-0 " >
                            <p>{obj.comment}</p>
                            </Card.Body>
                        </div>
                        );
                    })}
                    </div>
                {Array.isArray(reviews) &&reviews.length>6 &&<Link className="m-1  text-dark " onClick={(e)=>{setShowAllReviews(true)}}><p className="text-center">+ Show All</p></Link>}
            </div>

            <Modal size="lg" show={showAllReviews} onHide={()=>{setShowAllReviews(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>All Reviews</Modal.Title>    
                </Modal.Header>
                <Modal.Body >
                <div className="container d-grid mb-5">
                <div className="row p-0 ">
                {Array.isArray(reviews) &&reviews.map((obj) => {
                    return (
                        <div className="col-6 px-4 py-3 ">
                          <Card.Header
                            style={{ height: "30px" }}
                            className="d-flex px-2 border-top"
                          >
                          <h6 className=" fw-bold mt-1 mb-0">{obj.author}</h6>
                          <div className="ms-auto mt-2">
                            <DynamicStar
                              rating={obj.stars}
                              width="20"
                              height="20"
                            //   fullStarColor={"#"}
                              emptyStarColor={"#C5C5C5"}
                              sharpnessStar={2.2}
                          />
                          </div>
                          </Card.Header>
                          <Card.Body className="px-2 my-0" >
                            <p>{obj.comment}</p>
                          </Card.Body>
                        </div>);
                })}
                </div></div>
                   
                </Modal.Body>
                </Modal>
                
                
      </div>


    )
}

export default AllReviews