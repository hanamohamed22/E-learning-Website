import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import InstructorInfo from "../components/InstructorInfo";
import CardsCarousel from "../components/CardsCarousel";
import StarIcon from "@mui/icons-material/Star";
import { DynamicStar } from "react-dynamic-star";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Rating } from "react-simple-star-rating";
import { useLocation } from 'react-router-dom'
import AllReviews from "../components/AllReviews";
import { useAuthContext } from "../hooks/useAuthContext";
import AlertModal from "../components/AlertModal";

function InstructorProfile() {
  const {user}=useAuthContext();
  const { id } = useParams();
  console.log(user)
  // const location = useLocation()
  // if(location.state!==null){
  // var { from } = location.state;
  // }
  // else{
  //   from="instructor";
  // }
  //console.log("loading instructor of id: "+id);

  //const id="635a48148964b6e199512fe3";
  const [addReview, setAddReview] = useState(true);
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [courses, setCourses] = useState({});
  const [instructor, setInstructor] = useState({});
  const [reviews, setReviews] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false); //alermodal


  const handleRating = (e) => {
    console.log("rate=" + e);
    //setStarsReadonly(true);
    setStars(e);
  };
  const submitReview = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/addInstructorReview?id=${id}`,
        {
          comment: comment,
          stars: stars,
          author: user.user.username,
        }
      );
      console.log(res);
      setShowConfirm(true)
      setAddReview(false);
    } catch (err) {
      alert("Couldn't add review");
    }
    setComment("");
  };
  console.log("instructor")
  console.log(instructor)
  useEffect(() => {
    const fetchInstructor = async () => {
      const response = await axios.get(`/viewInstructor?id=${id}`);
      if (response) {
        setCourses(response.data.courses);
        setInstructor(response.data.instructor);
        setReviews(response.data.instructor.reviews);
      } else {
        alert("can't find course");
      }
    }
    
    fetchInstructor();
      
    // if(user){
    //   setInstructor(user.user)
    //   console.log(id)
    //   if(user.message==="instructor"){
    //     setReviews(user.user.reviews)
    //     setCourses(user.user.courses)
    //   }
    
  }, [user,reviews, instructor]);

  return (
    <div>
      
        <div>{user && (user.message === "instructor") &&
          <Button className="edit-profile-btn" href={`/editInstructor/${user.user._id}`}>
            Edit Profile
          </Button>}
          <InstructorInfo instructor={instructor} />
        </div>
      
      <div className="">
        {courses.length?<CardsCarousel courses={courses} />:<></>}
        {((user && user.message!="instructor") || !user) ?(<div></div>): (
        <Button
          href="/2"
          style={{ margin: "0 auto", display: "block", width: "285px" }}
        >
          Go to my courses
        </Button>)}
      </div>
      <AllReviews reviews={reviews} ></AllReviews>
      <hr className="w-75 mx-auto"/>
      {((user &&(user.message==="corporateTrainee"||user.message==="individualTrainee")) ) ? (
        <div className="addReviewDiv container text-center">
          <Form
          className="mx-auto"
            style={addReview ? { width: "500px" } : { display: "none" }}
            onSubmit={submitReview}
          >
            <h5 style={{fontSize:"1.5rem", marginRight:"20px"}}>Add your Review</h5>
            <Rating
              onClick={handleRating}
              transition="true"
              allowFraction="true"
              className="my-3"
            />
            <Form.Control
              as="textArea"
              rows="3"
              placeholder="enter a comment"
              type="text"
              onChange={(e) => setComment(e.target.value)} //whenevr i write sth this funct is called
              value={comment} //wareeny el baktbo
              className="mb-2 w-75 mx-auto"
            />
            <Button type="submit" size="sm">submit review</Button>
          </Form>
        </div>
      ) : (
        <div></div>
      )}


    <AlertModal show={showConfirm} hide={()=>{setShowConfirm(false)}} message="Thank you, Review added successfully"/>
    </div>
  );
}

export default InstructorProfile;
