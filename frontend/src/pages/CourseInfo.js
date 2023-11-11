import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {DynamicStar} from 'react-dynamic-star';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { Component } from 'react';
import { Rating } from 'react-simple-star-rating'
import Form from 'react-bootstrap/Form';
import {Link ,useParams,useNavigate} from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import AnchorLink from "react-anchor-link-smooth-scroll";
import Modal from "react-bootstrap/Modal";
import AllReviews from "../components/AllReviews";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { IconButton,  } from "@mui/material";
import RefundForm from "../components/RefundForm";
import ProgressModel from "../components/ProgressModel";
import RequestAccessForm from "../components/RequestAccessForm";
import { useAuthContext } from "../hooks/useAuthContext";
import ReportForm from "../components/ReportForm";
import SlideshowIcon from '@mui/icons-material/Slideshow';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import QuizIcon from '@mui/icons-material/Quiz';

function CourseInfo(props) {
  
  //const studentId='638cbd05b6e568db74b37511';
  //const studentType="individualTrainee";

  // const studentId='63637e2b24f8b375410b8c52';
  // const studentType="corporateTrainee";

 const navigate=useNavigate();
  const {user}=useAuthContext();
  console.log(user)
  const [studentId,setStudentId]=useState('')
  const [studentType,setStudentType]=useState('')
  console.log("course info")
  //console.log(user)
  console.log(studentId)
  console.log(studentType);
  
 
  //const loc=useLocation();
  const countryToCurrency = require("country-to-currency");
  const cur = countryToCurrency[props.con.value];
  const [currency, setCurrency] = useState("EGP");
  //  if(!loc.state)
  //  loc.state=0;
   //const {corporate}=loc.state;
  const { id } = useParams();//courseId
  const [registered, setRegistered] = useState(false);
  console.log("registered"+registered)
  
  const [addReview, setAddReview] = useState(true); //false hatshil el form of adding review
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [course, setCourse] = useState({});
  const [subtitles, setSubtitles] = useState([]);
  const [embedId, setEmbedId] = useState("");
  const [instructorid, setInstructorid] = useState("");
  const [price, setPrice] = useState(1);
  const [instructor,setInstructor]=useState({});
  const[showRefundForm,setShowRefundForm]=useState(false);
  const[showRequestAccessForm,setShowRequestAccessForm]=useState(false);
  const[purchasedValue,setPurchasedValue]=useState(0);
  const [showReportForm ,setShowReportForm] = useState(false);
  const [showPaymentOptions ,setShowPaymentOptions] = useState(false);
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null);
  const[newPrice,setNewPrice]=useState(0);

  const[progress,setProgress]=useState(0);

   console.log(progress)
  // useEffect(()=>{
  //     setEmbedId(course.video.split(".be/")[0]);
  //     console.log(embedId);

    const[averageRating,setAverageRating]=useState(0)
    useEffect(() => {
      if(user){
        setStudentId(user.user._id)
        setStudentType(user.message)
        console.log(id)
      
      }}
    ,[user]);
  useEffect(() => {
    const fetchCourse = async () => {
      const response = await axios.get(`/viewRegisteredCourse?id=${id}`);
      if (response) {
        setReviews(response.data.reviews);
        setInstructor(response.data.instructor);
        setCourse(response.data)
        const p=((response.data.price*price).toFixed(0));
        if(response.data.promotion.valid===1) setNewPrice(p-(p*(response.data.promotion.percent / 100)));
        if(response.data.video)
        setEmbedId(response.data.video.split("v=")[1].split("&")[0]);
      } else {
        alert("can't find course");
      }
    };

    const fetchSubs = async () => {
      const response = await axios.get(`/subtitles/?courseId=${id}`);
      if (response) {
        await setSubtitles(response.data);
      } else {
        setSubtitles([]);
      }
    };
    const fetchTakes = async () => {
      console.log("fetch takes")
      console.log(studentId)
      const response = await axios.get(`/studentTakesCourse?courseId=${id}&studentId=${user.user._id}&studentType=${user.message}`)
      console.log(response)
      if (Object.keys(response.data).length !== 0) {
        console.log(response.data)
          setProgress(response.data.progress)
          setRegistered(true);
          setPurchasedValue(response.data.value)
          }
       else {
        setRegistered(false);
        console.log("you are not registered")
       }
      }

    fetchSubs();

    fetchCourse();
    if(user){
    fetchTakes();
    }
  }, [user,progress]);
  useEffect(()=>{
  
    const currenciesrate = async () => {
      const response = await axios.get(
          "https://v6.exchangerate-api.com/v6/6d56731204e6abe03c0a12b5/latest/EGP"
      );
  
      if (response) {
          if (cur) {
          setCurrency(cur);
          Object.keys(response.data.conversion_rates).forEach((key) => {
              if (key === cur) {
              setPrice(response.data.conversion_rates[key]);
              }
          });
          }
      }
      };
      currenciesrate();
  
  },[cur]);
  const handleWallet = async (e) => {
    const confirmedPayment = await axios.post("/PayfromWallet", {
      id :user.user._id,
      price: course.price
    });
    console.log(confirmedPayment)
     //reset the state and show the success message
     if (confirmedPayment.message==="success") {
      const confirmedTakesinDataBase = await axios
      .post("/confirm-takes", {
          studentId:user.user._id,
          courseId: id,
          value:course.price
      })
      console.log(confirmedTakesinDataBase)
      if (confirmedTakesinDataBase){
       //reset();
       /*
        YOUR APPLICATION SPECIFIC CODE HERE:
        for this example all we do is render a modal
       */
       setSuccess(true);
      //alert("success")
      }
      
  }
  else {
    console.log("ana hena")
    setError("Not Enough Balance");
  }
  };
  const handleRating = (e) => {
    console.log("rate=" + e);
    //setStarsReadonly(true);
    setStars(e);
  };
  const submitReview = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/addCourseReview?id=${id}`, {
        comment: comment,
        stars: stars,
        author: "joussa",
      });
      console.log(res);
      alert("review added successfully");
      setAddReview(false);
    } catch (err) {
      alert("Couldn't add review");
    }
    setComment("");
  };

  

  return (
    <div>
      
        <div className="course-info content">
        <div className="row">
          <div className="col md-6">
            <h1>{course.title} Course</h1>
            <h5 className=" my-3">{course.summary}</h5>
                <div className="d-flex"> 
                    <DynamicStar
                    rating={course.avgRating} 
                    width={25} 
                    height={25}
                    emptyStarColor={"#C5C5C5"}
                    sharpnessStar={2.2}
                    />
                    {course.avgRating&&<h5 className="mx-1">{(Math.round(course.avgRating * 10) / 10)}</h5>}
                </div>
            {/* {((studentType==="individualTrainee") && !registered)&&} */}

            {((studentType==="corporateTrainee") && !registered)?<div>
              <Button size="lg"  variant="light highButton" onClick={()=>{setShowRequestAccessForm(true)}}>Request access</Button>{' '}
                <AnchorLink href='#course-modules'><Button className="mx-3 w-50 highButton"  size="lg" variant="outline-light">Course Syllabus</Button></AnchorLink>
            </div>:

            ((studentType!=="corporateTrainee") && !registered)?<div>


          {newPrice >0?
            <div className='d-flex'><h2 className="fw-bold">{newPrice}{currency}</h2><p className="text-decoration-line-through ms-2">{(course.price*price).toFixed(0)}{currency}</p></div>
            :
            <div>
              <h2>{(course.price*price).toFixed(0)} {currency}</h2>
            </div>
          }
                <Button size="lg" variant="light w-25 highButton" onClick={(e) => {
                setShowPaymentOptions(true)}}>Enroll now</Button>{' '}
                <AnchorLink href='#course-modules'><Button className="mx-3 w-50 highButton " size="lg" variant="outline-light " >Course Syllabus</Button></AnchorLink>
            </div>:
            registered&&
            //anyone registered
              <div>
              <Button style={{width:"200px"}} variant="outline-light my-3 w-25" size="lg" href={`/myCourse/${id}`}>Go To Course  </Button>{' '}
              {progress===100?
              <div className="reportProblem" style={{marginRight:"50px",marginTop:"7px"}}>
                
              <Button variant="light"  onClick={()=>{navigate(`/certificate/${user.user._id}/${id}`)}}>View My Course Certificate</Button>
                </div>:<></>}
              <div className="reportProblem" >
              
              <IconButton aria-label="Example"  data-bs-toggle="dropdown" aria-expanded="false" >
                  <ReportGmailerrorredIcon fontSize="large" sx={{ color: "lightgrey" }} />
              </IconButton>
              <ul class="dropdown-menu">
                {studentType==="individualTrainee"&&<li><a class="dropdown-item" href="#"onClick={()=>{setShowRefundForm(true)}}>Request refund</a></li>}
                <li><a class="dropdown-item" href="#" onClick = {()=> {setShowReportForm(true)}}>Report a problem</a></li>
              </ul>
              </div>
              
              </div>
              }
          
          </div>

          <div className="col md-6">
            {registered?<ProgressModel progress={progress}/>:<div>
            {embedId && <div >
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${embedId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>}
              </div> }
           </div>
          
          
        </div>
      </div>
              
            <div className="content mx-5 text-center">
                <p>Delivered by the best</p>
                <hr  style={{float:"left",width:"40%",marginTop:"2%"}}/>
                {instructor&&<Link to={`/instructorProfile/${instructor._id}`} state={{ from: "student" }} style={{ textDecoration: 'none', color:"black",float:"left",width:"20%"}}>
                <img className="instructor-img" alt="instructor img" style={{width:"30%"}} src={instructor.img}></img><h6>{instructor.name}</h6></Link>}
                <hr  style={{float:"right",width:"40%",marginTop:"2%"}}/>

            </div>
            {<div id="course-modules" >
            <div className="course-info-modules container mt-5 w-75" >
                {subtitles.length>0&&
                <div><h3>Course Modules</h3>
                <Accordion defaultActiveKey=""  >
                    {subtitles.map((sub,index)=>{return(
                        <Accordion.Item eventKey={index}>
                            <Accordion.Header className="fw-bold">{sub.title}</Accordion.Header>
                                <Accordion.Body>
                                    <div>
                                    <ListGroup >
                                        <p>{sub.description}</p>
                                        {sub.videos.length>0&& sub.videos.map(vid=>{
                                           return <p className="px-2 text-secondary"><SlideshowIcon color="disabled"/>{vid.description}</p>
                                        })} 
                                        {sub.exercises.length >0&&<p className="px-2 text-secondary"><QuizIcon color="disabled"/> Quiz</p>}
                                    </ListGroup></div>
                            </Accordion.Body>
                        </Accordion.Item>
                    );})}
                </Accordion></div>}
            </div>
            </div>}

            <div>
            <AllReviews  reviews={course.reviews} ></AllReviews>

            {/* {registered&&<div className="addReviewDiv container"> 
            <Form style={addReview? {width:"500px"}: {display:"none"}} onSubmit={submitReview}>
                <h4>Add your Review</h4>
                <Rating
                    onClick={handleRating}
                    transition="true"
                    allowFraction="true"
                    className="my-3"
                    size={30}
                />
                <Form.Control
                    as="textArea"
                    rows="3"
                    placeholder="enter a comment"
                    type="text"
                    onChange={(e) => setComment(e.target.value)} //whenevr i write sth this funct is called
                    value={comment}
                    className="mb-3"
                />
                <Button type="submit">submit review</Button>

            </Form>
            </div>} */}
        
            </div>
            
            <Modal show={showRefundForm} onHide={()=>{setShowRefundForm(false)}} className="modal-lg " >
              <RefundForm  onHide={()=>{setShowRefundForm(false)}}  courseId={id} studentId={studentId} progress={progress} value={purchasedValue}></RefundForm>
            </Modal>

            <Modal show={showRequestAccessForm} onHide={()=>{setShowRequestAccessForm(false)}} className="modal-lg " >
              <RequestAccessForm  onHide={()=>{setShowRequestAccessForm(false)}} courseId={id} studentId={studentId} />
            </Modal>
            
            <Modal show = {showReportForm} onHide ={()=>{setShowReportForm(false)}} className="modal" >
            <ReportForm  onHide={()=>{setShowReportForm(false)}} courseId={id} user={studentId} userType={studentType}  />
            </Modal>
            <Modal show = {showPaymentOptions} onHide ={()=>{setShowPaymentOptions(false)}} className="modal" >
            <div>
    
        {/* <Modal.Header closeButton>
          { <Modal.Title>Choose Payment Method</Modal.Title> }
        </Modal.Header> */}
        <Form className="create" >
         
          <Modal.Header closeButton>
        <Modal.Title>Choose Payment Method</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div class="list-group">
  <Button class="list-group-item list-group-item-action" aria-current="true"  variant="outline-primary"
  onClick=
    {(e) => {
      if(user){
      window.location.href = `/payments/id=${id}`;
      }
      else{
        window.location.href = '/login';
      }}}
  >
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">Credit Card <CreditCardIcon/></h5>
    </div>
  </Button>
  <br/>
  <Button class="list-group-item list-group-item-action" aria-current="true" variant="outline-primary"
   onClick={(e) => {
      if(user){
        handleWallet();
        setShowPaymentOptions(false)
        console.log("hana")
      }
      else{
        window.location.href = '/login';
      }}}>
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1" >Wallet <AccountBalanceWalletIcon/></h5>
    </div>
    
  </Button>

  </div>
  </Modal.Body>
        </Form>
      </div>
  </Modal>
  {/* Error modal */}
  <Modal show={error!==null}>
                <Modal.Header>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{error}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={(event)=>{setError(null)}}>Close</Button>    
                </Modal.Footer>
            </Modal>


            {/* success banner, only shows after confirmation */}
  <Modal show={success}>
                <Modal.Header>
                    <Modal.Title>Payment Succeeded</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Your wallet payment has been confirmed
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="success" onClick={ () =>{navigate("/trainee")}}>Close</Button>
                    
                </Modal.Footer>
            </Modal>


        </div>
      
    
  );
}

export default CourseInfo;

