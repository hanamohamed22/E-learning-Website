import { useEffect, useState } from "react";
import axios from "axios";
import React, { Component } from "react";
import { Rating } from "react-simple-star-rating";
import { Link, useNavigate, useParams } from "react-router-dom";
import PromoForm from "../components/PromoForm";
import SubtitleCard from "../components/SubtitleCard";
//import Accordion from 'react-bootstrap/Accordion';
//import AddIcon from '@mui/icons-material/Add';
import ExerciseForm from "../components/ExerciseForm";
import AnsweredQuiz from "../components/AnsweredQuiz"
// { shouldForwardProp } from "@mui/styled-engine";import Button from 'react-bootstrap/Button';
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import AddIcon from "@mui/icons-material/Add";
import { DynamicStar } from "react-dynamic-star";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import SubtitleForm from "../components/SubtitleForm";
import YouTube, { YouTubeProps } from "react-youtube";
import { useAuthContext } from '../hooks/useAuthContext';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AlertModal from "../components/AlertModal";
import EditIcon from "@mui/icons-material/Edit";
import EditCourseForm from "../components/EditCourseForm";
import DeleteIcon from '@mui/icons-material/Delete';



import Modal from "react-bootstrap/Modal";
import VideoForm from "../components/VideoForm";
import AllReviews from "../components/AllReviews";
import { modalUnstyledClasses } from "@mui/material";

function InstructorViewCourse(props) {
  const { id } = useParams();
  const { user } = useAuthContext()
  const navigate = useNavigate();

  const [subtitleId, setSubtitleId] = useState("");
  const [EmbedId, setEmbedId] = useState(""); //used for youtube videos
  const [clickedvid, setClickedVid] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [course, setCourse] = useState({});
  const [subtitles, setSubtitles] = useState([]);
  const [price,setPrice]=useState(0);
  const [newPrice, setNewPrice] = useState(0); //for promotion check
  const [promotion, setPromotion] = useState({
    percent: 0,
    startDate: { varOne: new Date() },
    endDate: { varOne: new Date() },
    admin:false
  });
  const [subvideo, setsubVideo] = useState({
    videoURL: "",
    description: "",
  });
  const [video, setVideo] = useState("");
  const [exercises, setExercises] = useState({});
  const [question, setQuestion] = useState("");
  const [answer1, setAnswer1] = useState({ answerText: "", isCorrect: false });
  const [answer2, setAnswer2] = useState({ answerText: "", isCorrect: false });
  const [answer3, setAnswer3] = useState({ answerText: "", isCorrect: false });
  const [answer4, setAnswer4] = useState({ answerText: "", isCorrect: false });

  const [showConfirmPublish, setShowConfirmPublish] = useState(false);  
  const [showPromoForm, setShowPromoForm] = useState(false);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [showExerForm, setShowExerForm] = useState(false);
  const [showAddSubtitle, setShowAddSubtitle] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showEditCourse, setShowEditCourse] = useState(false);


  const [addedVideoId,setAddedVideoId]= useState("");
  const [duration,setDuration]=useState(0);
  const [url,setUrl]= useState("");//added video url
  const[previewVid,setPreviewVid]=useState("")

  const[showAlert,setShowAlert]=useState(false);
  const [alertMssg,setAlertMssg]=useState("");

 
  useEffect(() => {
    const fetchCourse = async () => {
      const response = await axios.get(`/viewRegisteredCourse?id=${id}`);
      if (response) {
        if(!response.data.published){
          setCourse(response.data);
          setPrice((response.data.price*rate).toFixed(0));
          const p=((response.data.price*rate).toFixed(0));
          if(response.data.promotion.valid===1) setNewPrice(p-(p*(response.data.promotion.percent / 100)));
          if (response.data.video) setPreviewVid(response.data.video.split("v=")[1].split("&")[0]);}

        else{
          window.location.href=`/course/${id}`
        }

      } else {
        alert("can't find course");
      }
    };

    const fetchSubs = async () => {
      const response = await axios.get(`/subtitles/?courseId=${id}`);
      if (response) {
        setSubtitles(response.data);
      } else {
        setSubtitles([]);
      }
    };

    fetchSubs();
    fetchCourse();
    

  }, [showQuiz, subtitleId, subtitles, EmbedId, id]);

  const countryToCurrency = require("country-to-currency");
  const cur = countryToCurrency[props.con.value];
  const [currency, setCurrency] = useState("EGP");
  const [rate,setRate]=useState(1);

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
              setRate(response.data.conversion_rates[key]);
              }
          });
          }
      }
      };
      currenciesrate();
  
  },[cur]);

  const publish = async () => {
    console.log("heyyyy")
    if(subtitles.length===0){
      setShowAlert(true);
      setAlertMssg("Please add course Moudules before publishing")}
    else{
    const response = await axios.post(`/instructorPublishCourse/?courseId=${id}`);
    if (response) {
      setShowAlert(true);
      setAlertMssg("Published Successfully")} 
      else {
        setShowAlert(true);
        setAlertMssg("Err: Couldn't publish")
    }}

  };

  const handlePromoForm = () => {
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
        promo: promotion,
      });

      if (response) {
        setShowAlert(true);
        setAlertMssg("Promotion added successfully")
      }
    } catch (err) {
      alert("Couldn't add promotion");
    }

    setShowPromoForm(!showPromoForm);
  };

  const handleExerForm = async (e) => {
     setSubtitleId(e.target.id);
    setShowExerForm(!showExerForm);
  };

  const handleExerChange = async (e) => {
   //console.log("value"+e.target)
    // console.log(subtitleId + "render");
    if (e.target.name === "question") {
      setQuestion(e.target.value);
    }
    if (e.target.name === "answer1") {
      setAnswer1({ ...answer1, answerText: e.target.value });
    }
    if (e.target.name === "answer2") {
      setAnswer2({ ...answer2, answerText: e.target.value });
    }

    if (e.target.name === "answer3") {
      setAnswer3({ ...answer3, answerText: e.target.value });
    }

    if (e.target.name === "answer4") {
      setAnswer4({ ...answer4, answerText: e.target.value });
    }
    if (e.target.name === "isCorrect") {
     // console.log(e.target.value);
      if (e.target.value === "1" || e.target.value === 1) {
      //  console.log("hhh")
        setAnswer1({ ...answer1, isCorrect: true });
        setAnswer2({ ...answer2, isCorrect: false });
        setAnswer3({ ...answer3, isCorrect: false });
        setAnswer4({ ...answer4, isCorrect: false });
      } else if (e.target.value === "2" || e.target.value === 2) {
        setAnswer1({ ...answer1, isCorrect: false });
        setAnswer2({ ...answer2, isCorrect: true });
        setAnswer3({ ...answer3, isCorrect: false });
        setAnswer4({ ...answer4, isCorrect: false });
      } else if (e.target.value === "3" || e.target.value === 3) {
        setAnswer1({ ...answer1, isCorrect: false });
        setAnswer2({ ...answer2, isCorrect: false });
        setAnswer3({ ...answer3, isCorrect: true });
        setAnswer4({ ...answer4, isCorrect: false });
      } else if (e.target.value === "4" || e.target.value === 4) {
        setAnswer1({ ...answer1, isCorrect: false });
        setAnswer2({ ...answer2, isCorrect: false });
        setAnswer3({ ...answer3, isCorrect: false });
        setAnswer4({ ...answer4, isCorrect: true });
      }
    }

    setExercises({
      questionText: question,
      answerOptions: [answer1, answer2, answer3, answer4],
    });
  };
  const handleVideoForm = async (e) => {
    await setSubtitleId(e.target.id);
    setShowVideoForm(!showVideoForm);
  };

  const handleVideoChange = (e) => {
    const { name, value } = e.target;
    //console.log(name+"  "+value);
    setsubVideo({ ...subvideo, [name]: value });
    if(name==="videoURL"){
            
      console.log(e.target);
          setUrl(value);
      }
    
  };
  const deletesubtitles = async (id) => {
   console.log (id);
   const response = await axios.post(`/deletesubtitles`,{
   id:id
   });
   if (response) {
    setShowAlert(true);
    setAlertMssg("Subtitle deleted")
   }
     else {
      alert("Couldn't delete")
   }}

    //console.log(name+"  "+value);
    
    
  
  // useEffect(()=>{
  //   const updatePromotion = async () => {
  //     await axios.patch('/updatePromotion');
  // };
  // updatePromotion();

  // },[])

  useEffect(()=>{
    console.log(duration);
    
       const submit=async()=>{
        if(duration){
            try {
              const response = await axios.post(`/addSubtitleVideo?id=${subtitleId}`, {
                subvideo: {videoURL:subvideo.videoURL,description:subvideo.description,duration:(duration/3600).toFixed(3)}
              });

              if (response) {
                setShowAlert(true);
        setAlertMssg("Video added successfully")
              }
            } catch (err) {
              alert("Couldn't add video");
            }
          }
          setDuration(0);
          setAddedVideoId("");}
  submit();
  },[duration]);
  
  const addSubVideo = async (e) => {
    e.preventDefault();
    console.log("submitted");
    setAddedVideoId(url.split("v=")[1].split("&")[0]);
    setShowVideoForm(!showVideoForm);
  };

  const addVideo = async (e) => {
    e.preventDefault();
    //console.log("video:"+video);
    try {
      const response = await axios.post(`/addCourseVideo?id=${id}`, {
        video: video,
      });

      if (response) {
        setShowAlert(true);
        setAlertMssg("Video added Successfully")
        setEmbedId(video.split("v=")[1].split("&")[0]);
      }
    } catch (err) {
      alert("Couldn't add video");
    }
  };

    const addExer=async (e)=>{
            e.preventDefault();
           // console.log({id})
          //console.log("addexer")
           //console.log(answer1)
         //  console.log(exercises.answerOptions)
        try {
          console.log( question.trim().length);
          console.log( answer1.answerText.trim().length);
          console.log( answer2.answerText.trim().length);
            console.log( answer3.answerText.trim().length);
            console.log( answer4.answerText.trim().length);
            console.log( answer1.isCorrect);
          console.log( answer2.isCorrect);
            console.log( answer3.isCorrect);
            console.log( answer4.isCorrect);

            
            if(question.trim().length !== 0 && answer1.answerText.trim().length !== 0 &&  answer2.answerText.trim().length !== 0 &&
              answer3.answerText.trim().length !== 0 &&  answer4.answerText.trim().length !== 0 &&
              ( answer1.isCorrect===true || answer2.isCorrect===true || answer3.isCorrect===true || answer4.isCorrect===true)){
                console.log("gowa elif")
                console.log(answer1.answerText)
            const response=await axios.post(`/addSubtitleExer?id=${subtitleId}`, {
                questionText:question,
                answerOptions:[answer1,answer2,answer3,answer4]
            });


            if (response) {
              setShowAlert(true);
              setAlertMssg("Added Successfully")                
            } 
            setShowExerForm(!showExerForm);
           
      
          }
          else{
            setShowAlert(true);
            setAlertMssg("please fill in all required spaces ")      
              }
         } catch (err) {
          
            alert("Couldn't add exercise");
          }
        }
           
  const handleAddSubtitle=async(e)=>{
          setShowAddSubtitle(!showAddSubtitle)
        }

  const vidhandler = (e) => {
    console.log(e.target.value);
    setVideo(e.target.value);
  };
                
                
            
    return(  
        <div>
      <div className="course-info content position-relative">
        <Link style={{position:"absolute",top:"16px",right:"12px",color:"white"}}><EditIcon 
          onClick={()=>{setShowEditCourse(true)}} /></Link>
        <div className="row ">
        <div className="col-6">
          <h1>{course.title} Course</h1>
          <div>
        <h5 className=" my-3">{course.summary}</h5><br/>
        <AccessTimeIcon className="float-clear" fontSize="medium" sx={{ color:" white" }}/><h5> {course.totalHours?((course.totalHours).toFixed(2)):null} hrs</h5>
        <div className="d-flex">
          <DynamicStar
            rating={course.avgRating}
            width={25}
            height={25}
            emptyStarColor={"#C5C5C5"}
            sharpnessStar={2.2}
          />
          {course.avgRating && (
            <h5 className="mx-1">{Math.round(course.avgRating * 10) / 10}</h5>
          )}
        </div>
        
        {/* /////////price////// */}
        {newPrice >0?
            <div className='d-flex'><h2 className="fw-bold">{newPrice}{currency}</h2><p className="text-decoration-line-through ms-2">{price}{currency}</p></div>
            :
            <div>
              <h2>{price}{currency}</h2>
            </div>
          }
        
          </div>
          </div>

          <div className="col-6 ">
          {previewVid === "" ? (
            <div>
              <p>No Preview Video for this Course</p>
              <label for="basic-url" class="form-label">
                Add Your Video URL
              </label>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon3">
                  https://www.youtube.com/watch?v=key
                </span>
                <input
                  onChange={vidhandler}
                  type="text"
                  class="form-control"
                  id="basic-url"
                  aria-describedby="basic-addon3"
                />
              </div>
              <Button onClick={addVideo}>Add Video</Button>{" "}
            </div>
          ) : (
            <div>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${previewVid}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
              <p>{videoDescription}</p>
            </div>
          )}
          </div>
    </div>
    </div>
    <div className="  px-1 mx-4 mb-3">
          <Button className=" w-100 "variant="outline-reddy" size="lg"  style={{height:"60px" }}onClick={()=>{setShowConfirmPublish(true)}} >
            Publish Course
          </Button>
    </div>

    <div className="courseContainer">
       
      <div>
        {" "}
        {!showQuiz ? 
        clickedvid !== "" &&<div>
          <iframe
            width="100%"
            height="485"
            src={`https://www.youtube.com/embed/${clickedvid}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
          <p>{videoDescription}</p>
        </div> : (
          <AnsweredQuiz subtitleId={subtitleId} user={user} />
        )}

      </div>
      <br />


      <div className="subs-accordions">
        <Accordion defaultActiveKey="">
          {subtitles.length>0? subtitles.map((sub, index) => {
            return (
              <Accordion.Item eventKey={index} id={sub._id}>
                <Accordion.Header className="d-flex"> {sub.title}<Link onClick={(e)=>{deletesubtitles(sub._id); }} ><DeleteIcon/> </Link>
                </Accordion.Header>
                <Accordion.Body>
                  <div>
                    <ListGroup.Item
                      className="d-flex pb-2"
                      id={sub._id}
                      action
                      onClick={(e) => {
                        setSubtitleId(sub._id);
                      }}>
                      <label>Videos</label>
                      
                      <AddIcon
                      className="ms-auto me-3"
                        id={sub._id}
                        onClick={handleVideoForm}
                      ></AddIcon>
                    </ListGroup.Item>
                    <ListGroup>
                      {sub.videos.map((vid, index) => {
                        return (
                          <ListGroup.Item
                            value={index}
                            action
                            onClick={(e) => {
                              setClickedVid(
                                vid.videoURL.split("v=")[1].split("&")[0]
                              );
                              setVideoDescription(vid.description);
                              setShowQuiz(false);
                            }}
                          >
                            lesson video {index + 1}
                            {/* <AddIcon id={sub._id} onClick={handleExerForm}></AddIcon> //to add video */}
                          </ListGroup.Item>
                        );
                      })}
                    </ListGroup>
                  </div>
                  <div>
                  <ListGroup.Item
                      className="d-flex py-2 "
                      id={sub._id}
                      action
                      onClick={(e) => {
                        setSubtitleId(sub._id);
                      }}>
                      <label>Exercises</label>
                      <AddIcon
                        className="ms-auto me-3"
                          id={sub._id}
                          onClick={handleExerForm}
                        ></AddIcon>
                    </ListGroup.Item>
                    <ListGroup>
                    {sub.exercises.length>0?<ListGroup.Item
                        id={sub._id}
                        action
                        onClick={(e) => {
                          setShowQuiz(true);
                          setSubtitleId(sub._id);
                        }} >
                        Exercises 1
                        {/* <AddIcon
                          id={sub._id}
                          onClick={handleExerForm}
                        ></AddIcon> */}
                      </ListGroup.Item>: <div></div>  
                      }
                    </ListGroup>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            );
          }):<h4 className="text-center">No subtitles for this course</h4>}
        </Accordion>
        <Link className="m-1  text-dark " onClick={(e)=>{setShowAddSubtitle(true)}}><p className="text-end">+ Add Subtitles</p></Link>
      </div>
        
      </div> 
     
<div className="container d-grid my-5">



    <PromoForm
      id={id}
      showPromoForm={showPromoForm}
      handlePromoForm={handlePromoForm}
      handleChange={handleChange}
      addPromo={addPromo}
    />
 
  <ExerciseForm
    subtitleId={subtitleId}
    showExerForm={showExerForm}
    handleExerForm={handleExerForm}
    handleExerChange={handleExerChange}
    addExer={addExer}
  />
  <VideoForm
    showVideoForm={showVideoForm}
    handleVideoForm={handleVideoForm}
    handleVideoChange={handleVideoChange}
    addSubVideo={addSubVideo}
  />
</div>
<Modal show={showAddSubtitle} onHide={handleAddSubtitle}>
  <SubtitleForm show={handleAddSubtitle} courseId={id}></SubtitleForm>
</Modal>

  <Modal show={showConfirmPublish} onHide={()=>{setShowConfirmPublish(false)}} className="modal-lg " >
    <Modal.Header closeButton  ><h4>Publish Course</h4></Modal.Header>
      <Modal.Body className=" text-center container p-5 ">
          <h4>Are you sure you want to publish this course?</h4>
          <p className="text-muted"> know that by publishing this course you will not be able to edit this course anymore or add any new modules</p>                
      
        <Button variant="btn btn-reddy"className=" w-25 m-3"  onClick={()=>{setShowConfirmPublish(false);publish()}}>Confirm</Button>
        <Button variant="btn btn-outline-secondary" className=" w-25 m-3" onClick={()=>{setShowConfirmPublish(false)}}>Cancel</Button>
      </Modal.Body>
    </Modal>

    <Modal show={showEditCourse} onHide={()=>{setShowEditCourse(false)}}>
      <EditCourseForm show={()=>{setShowEditCourse(false)}} course={course}></EditCourseForm>
    </Modal>

    

{addedVideoId&&<YouTube style={{display:"none"}} videoId={addedVideoId}  onReady={(e)=>{setDuration(e.target.getDuration())}}  />}

<AlertModal show={showAlert} hide={()=>{setShowAlert(false)}} message={alertMssg}/>

</div>
);
}

export default InstructorViewCourse;
