import { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import {DynamicStar} from 'react-dynamic-star';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { Component } from 'react';
import { Rating } from 'react-simple-star-rating'
import Form from 'react-bootstrap/Form';
import {Link ,useParams,useNavigate} from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import Modal from "react-bootstrap/Modal";
import AllReviews from "../components/AllReviews";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { IconButton,  } from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";
import PromoForm from "../components/PromoForm";
import ReportForm from "../components/ReportForm";
import AlertModal from "../components/AlertModal";


function InstructorViewPublished(props) {
  
 const navigate=useNavigate();
  const {user}=useAuthContext();
  console.log(user)
  const [studentId,setStudentId]=useState('')
  const [studentType,setStudentType]=useState('')
  const { id } = useParams();//courseId
  
  const [closed,setClosed]=useState(false);
  const [course, setCourse] = useState({});
  const [subtitles, setSubtitles] = useState([]);
  const [embedId, setEmbedId] = useState("");
  const [price, setPrice] = useState(1);
  const [showPromoForm, setShowPromoForm] = useState(false);
  const [showConfirmClose, setShowConfirmClose] = useState(false);
  const [promoted,setPromoted]= useState(false);
  const [newPrice, setNewPrice] = useState(0);
  const [promotion, setPromotion] = useState({
    percent: 0,
    startDate: { varOne: new Date() },
    endDate: { varOne: new Date() },
    admin:false
  });
  const [showReportForm ,setShowReportForm] = useState(false);
  const [showAdminPromo,setShowAdminPromo]= useState(false);
  const[showAlert,setShowAlert]=useState(false);
  const [alertMssg,setAlertMssg]=useState("");



  
  const countryToCurrency = require("country-to-currency");
  const cur = countryToCurrency[props.con.value];
  const [currency, setCurrency] = useState("EGP");
  const [rate,setRate]=useState(1);

  useEffect(()=>{
  
    const currenciesrate = async () => {
      const response = await axios.get(
          "https://v6.exchangerate-api.com/v6/a75d504cc0c97663c4ce59a5/latest/EGP"
      );
  
      if (response) {
          if (cur) {
          setCurrency(cur);
          Object.keys(response.data.conversion_rates).forEach((key) => {
              if (key === cur) {
              setRate(response.data.conversion_rates[key]);
              }
          });
          }
      }
      };
      currenciesrate();
  
  },[cur]);
  
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
        setCourse(response.data)
        setPrice((response.data.price*rate).toFixed(0));
        if(response.data.promotion.valid) setPromoted(true);
        if(response.data.video) setEmbedId(response.data.video.split("v=")[1].split("&")[0]);
        const p=((response.data.price*rate).toFixed(0));
        if(response.data.promotion.valid===1) setNewPrice(p-(p*(response.data.promotion.percent / 100)));
        if(response.data.closed) setClosed(true)

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

    fetchSubs();

    fetchCourse();
    
  }, [user,closed]);
  useEffect(()=>{
  
    const currenciesrate = async () => {
      const response = await axios.get(
          "https://v6.exchangerate-api.com/v6/a75d504cc0c97663c4ce59a5/latest/EGP"
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

  const close = async () => {
    
    const response = await axios.post(`/instructorCloseCourse/?courseId=${id}`);
    if (response) {
      
      setClosed(!closed)
    } else {
      alert("couldn't publish")
    }

  };

  const handlePromoForm = () => {
    if(promoted && course.promotion.admin)
    setShowAdminPromo(!showAdminPromo)
    else
    setShowPromoForm(!showPromoForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromotion({ ...promotion, [name]: value });
  };

  const addPromo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/addCoursePromo', {
        ids:[id],
        promo: promotion
      });

      if (response) {
        setShowAlert(true);
      setAlertMssg("Promotion added successfully");
      }
    } catch (err) {
      alert("Couldn't add promotion");
    }
   
    setShowPromoForm(!showPromoForm);
  };

  

  return (
    <div>
      
        <div className="course-info content">
        {closed&&<div className="fs-6 badge rounded-pill text-bg-light"style={{position:"absolute",top:"7rem",left:"4rem"}} >Closed</div>}
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
          
          {newPrice >0?
            <div className='d-flex'><h5 className="fw-bold">{newPrice}{currency}</h5><p className="text-decoration-line-through ms-2">{price}{currency}</p></div>
            :
            <div>
              <h5>{price}</h5><span>{currency}</span>
            </div>
          }

          {promoted?
          <div>
            <p><h5>promotion:</h5> {course.promotion.percent}%{" "}</p>
            <span><h5>Starts:</h5> {course.promotion.startDate.substring(0, 10)}{" "}</span>
            <span><h5>Ends:</h5> {course.promotion.endDate.substring(0, 10)}</span>
            <br/><Button variant="light w-50"onClick={handlePromoForm}>Add Another Promotion</Button>
          </div>:<div>
            <p>no current promotion</p>
            <Button variant="light w-25" onClick={handlePromoForm}>Add Promotion</Button>{" "}
          </div>
          }
           <div className="reportProblem">
              <IconButton aria-label="Example"  data-bs-toggle="dropdown" aria-expanded="false" >
                  <ReportGmailerrorredIcon fontSize="large" color="action" />
              </IconButton>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" onClick = {()=> {setShowReportForm(true)}}>Report a problem</a></li> 
              </ul>
            </div>
          
          </div>
              
              
              
          
          

          <div className="col md-6">
          <div>
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
              </div> 
           </div>
          </div>
          
        </div>
              
        <div className="  px-1 mx-4 mb-3">
          {!closed?
          <Button className=" w-100 "variant="outline-reddy" size="lg"  style={{height:"60px" }} onClick={()=>{setShowConfirmClose(true)}}  >
            Close Course
          </Button>:
          <Button className=" w-100 "variant="outline-reddy" size="lg"  style={{height:"60px" }} onClick={()=>{setShowConfirmClose(true)}}  >
            Open Course
          </Button>
          }
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
                                        <p>{sub.videos.length} videos</p>
                                        {sub.exercises.length>0&&<p>1 Exercise</p>}
                                    </ListGroup></div>
                            </Accordion.Body>
                        </Accordion.Item>
                    );})}
                </Accordion></div>}
            </div>
            </div>}

            <div>
            <AllReviews  reviews={course.reviews} ></AllReviews>

            
            </div>
            <PromoForm
              id={id}
              showPromoForm={showPromoForm}
              handlePromoForm={handlePromoForm}
              handleChange={handleChange}
              addPromo={addPromo}
            />

        <Modal show={showConfirmClose} onHide={()=>{setShowConfirmClose(false)}} className="modal-lg " >
            <Modal.Header closeButton  ></Modal.Header>
              <Modal.Body className=" text-center container p-5 ">
                  <h4>Are you sure you want to close this course?</h4>
                  <p className="text-muted"> know that by closing this course no more students will be able to enroll however the already registered ones will stay registered</p>                
            <Button variant="btn btn-reddy"className=" w-25 m-3"  onClick={()=>{setShowConfirmClose(false);close();}}>Confirm</Button>
            <Button variant="btn btn-outline-secondary" className=" w-25 m-3" onClick={()=>{setShowConfirmClose(false)}}>Cancel</Button>
          </Modal.Body>
        </Modal>

        <Modal show = {showReportForm} onHide ={()=>{setShowReportForm(false)}} className="modal" >
          <ReportForm  onHide={()=>{setShowReportForm(false)}} courseId={id} user={studentId} userType={studentType}  />
        </Modal>

        <Modal show={showAdminPromo} onHide={()=>{setShowAdminPromo(false)}} className="modal " >
            <Modal.Header closeButton  ></Modal.Header>
              <Modal.Body className=" text-center container p-4 " style={{width:"500px",height:"150px"}} >
                  <h4>This Promotion is added by the admin</h4>
                  <p className="text-muted"> sorry you can not overwrite it</p>                
            <Button variant="btn btn-reddy"className=" px-3 m-2"  onClick={()=>{setShowAdminPromo(false)}}>ok</Button>
          </Modal.Body>
        </Modal>

        <AlertModal show={showAlert} hide={()=>{setShowAlert(false)}} message={alertMssg}/>

        </div>
      
    
  );
}

export default InstructorViewPublished;
