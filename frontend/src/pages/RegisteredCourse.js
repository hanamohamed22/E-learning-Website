import { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Quiz from "../components/Quiz";
import YouTube, { YouTubeProps } from "react-youtube";
import AllReviews from "../components/AllReviews";
import { Rating } from "react-simple-star-rating";
import Form from "react-bootstrap/Form";
import AddIcon from "@mui/icons-material/Add";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import Button from "react-bootstrap/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "react-bootstrap/Card";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useAuthContext } from '../hooks/useAuthContext'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import jsPDF from "jspdf";
import { renderToString } from "react-dom/server";
import html2canvas from "html2canvas";
import "./pages.css";
import { Link } from "react-router-dom";

function RegisteredCourse() {
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [videoId, setVideoId] = useState("");//id of video being watched set onclick
  const [embedId, setEmbedId] = useState(""); //used for youtube videos
  const [course, setCourse] = useState({});
  const [subtitles, setSubtitles] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [subtitleId, setSubtitleId] = useState("");
  const [subtitleForm, setSubtitleForm] = useState(false);
  const [preview, setPreview] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [videoDescription, setVideoDescription] = useState("");
  const { courseId } = useParams();
  //console.log(courseId)
  const [videosWatched, setVideosWatched] = useState([]);
  const [exercisesSolved, setExercisesSolved] = useState([]);

  
  const [progress,setProgress]=useState(0);
        //const courseId = "6382041d1cffb5f04404c9d4"; //temp
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [time, setTime] = useState("0:00");
  const [showEditor, setShowEditor] = useState(false);
  const [notetime, setnoteTime] = useState("0:00");
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  const [subtitle,setSubtitle]=useState("");
  const [duration, setDuration] = useState(0); //duration of video played
  const[certificate,setCertificate]=useState(false);
  //
  const { user } = useAuthContext();
  const [exerciseId,setExerciseId]=useState("");

 //console.log(user)
  
 // const studentId='638cbd05b6e568db74b37511';
 // const studentType="individualTrainee";
  const fetchNotes=async()=>{
    const response = await axios.get(`/getNotes/?studentId=${user.user._id}&courseId=${courseId}&studentType=${user.message}`);
    if (response.data) {
      setNotes(response.data.notes);
    } else {
      setNotes([]);
    }
  };
  useEffect(() => {
    // const url ="https://www.youtube.com/watch?v=98BzS5Oz5E4";
    // console.log(url.split("v=")[1].split("&")[0]); //how to get embedId

    const fetchCourse = async () => {
      const response = await axios.get(`/viewRegisteredCourse?id=${courseId}`);
      if (response) {
        setCourse(response.data);
        if (response.data.video && embedId === "") {
          setEmbedId(response.data.video.split("v=")[1].split("&")[0]);
          setVideoDescription("Course preview Video " + response.data.summary);
        }
      } else {
        //alert("can't find course");
      }
    };

    const fetchSubs = async () => {
      const response = await axios.get(`/subtitles/?courseId=${courseId}`);
      if (response) {
        await setSubtitles(response.data);
      } else {
        setSubtitles([]);
      }
    };
    const fetchTakes = async () => {
      const response = await axios.get(`/studentTakesCourse?courseId=${courseId}&studentId=${user.user._id}&studentType=${user.message}`)
       
      if (response) {
          setExercisesSolved(response.data.exercisesSolved.map(x=>{return x.exerciseId}))
          setVideosWatched(response.data.videosWatched);
          setProgress(response.data.progress)
          setCertificate(response.data.certificate);
          //console.log(certificate)
        //console.log(response.data.progress)
      }
       else {
        console.log("you are not registered")
       }
      }
      const goToCertificate=async()=>{
      if(!certificate && progress===100){
        // const response = await axios.post('/addCertificate',{
        //   courseId:courseId,studentId:user.user._id,studentType:user.message
        // });
        // if(response){
        navigate(`/certificate/${user.user._id}/${courseId}`);
        
      }
    }

    

    fetchSubs();
    fetchCourse();
    fetchNotes();
    fetchTakes();
    goToCertificate();
  }, [subtitleForm, subtitles, embedId,courseId,progress,user]);

  const videoIsWatched=async ()=>{

    if(videoId==""&&!preview ){}
    //alert("video id is empty")
    else{
      const response = await axios.post('/addWatchedVideo',{
        courseId:courseId,studentId:user.user._id,videoId:videoId,studentType:user.message
      });
      if (response) {
      
      } else {
        //alert("error in setting video to watched")
      }

  }}
  const opts: YouTubeProps["opts"] = {
    height: "485", //100%
    width: "100%", //485
    playerVars: {
      autoplay: 1,
      rel:0
    },
  };
  
  const handleRating = (e) => {
    console.log("rate=" + e);
    //setStarsReadonly(true);
    setStars(e);
  };
  const submitReview = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/addCourseReview?id=${courseId}`, {
        comment: comment,
        stars: stars,
        author:user.user.username,
      });
      console.log(res);
      setComment("");
      //alert("review added successfully");


    } catch (err) {
      //alert("Couldn't add review");
    }
  };
  const videoReady=(e)=>{
    setPlayer(e.target);
    setDuration(e.target.getDuration());}
  
  const getTime = (e) => {
    const t = Math.round(e.target.getCurrentTime());
    var minutes = Math.floor(t / 60);
    var seconds = t - minutes * 60;
    console.log("hey")
    if(Math.floor((t/duration)*100)>95){ 
    console.log("call video is watched")//percentage watched
    videoIsWatched();}

    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    setTime(minutes + ":" + seconds);
  };
  const Addnote = async () => {
    const response = await axios.patch(
      `/addNote/?studentId=${user.user._id}&courseId=${courseId}&studentType=${user.message}`,
      {
        notetime,
        note: text,
        videoid: embedId,
      }
    );
    if (response) {
      setShowEditor(false);
    } else {
      //alert("couldn't add note");
    }
  };
  const editNote = async (t) => {
    const response = await axios.patch(
      `/editNote/?studentId=${user.user._id}&courseId=${courseId}&studentType=${user.message}`,
      {
        notetime: t,
        note: text,
        videoid: embedId,
      }
    );
    if (response) {
      //alert("note edited successfully");
      setShowEditor(false);
      setShowEdit(false);
      fetchNotes();
    } else {
     // alert("couldn't edit note");
    }
  };
  const deleteNote = async (nt) => {
    console.log(nt);
    const response = await axios.patch(
      `/deleteNote/?studentId=${user.user._id}&courseId=${courseId}&studentType=${user.message}`,
      {
        notetime: nt,
        note: text,
        videoid: embedId,
      }
    );
    if (response) {
      //alert("note deleted successfully");
    } else {
      //alert("couldn't delete note");
    }
  };
  const Seekto = (t) => {
    console.log(t);
    var mins = Number(t.split(":")[0]);
    var secs = Number(t.split(":")[1]);
    secs = mins * 60 + secs;
    console.log(secs);
    if (player) {
      player.seekTo(secs);
      player.playVideo();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    
  }
  // const Prints = () => (
  //   <div>
  //     <h1>{course.title} Course</h1>
  //     <h2>Subtitle: {subtitle}</h2>
  //     <h6>Video Description: {videoDescription}</h6>
  //     {Array.isArray(notes) &&
  //     notes
  //       .filter((note) => note.videoid === embedId)
  //       .map((obj) => {
  //         <p>{obj.note}</p>
  //       })}
  //   </div>

  // );
  const downloadNotes=async()=>{
    var doc = new jsPDF("p", "pt", "A4");
    
    doc.text(`${course.title} Course`,250,40,'center')
    // doc.text(`Subtitle: ${subtitle}`,20,70)
    // doc.text(`Video Description: ${videoDescription}`,20,100)
    
    notes.map((note,index)=>{
      doc.text(`note ${index+1}: ${note.note}`,20,120+(20*index))})
    
  //   let iframe = document.createElement("iframe");
  // iframe.style.visibility = "hidden";
  // document.body.appendChild(iframe);
  // let iframedoc = iframe.contentDocument || iframe.contentWindow.document;
  
  
 
  
  // Convert the iframe into a PNG image using canvas.
  
    // Array.isArray(notes) &&
    //   notes
    //     .filter((note) => note.videoid === embedId)
    //     .map((obj) => {
    //       iframedoc.body.innerHTML += obj.note;
    //     })
        
    //     let canvas = await html2canvas(iframedoc.body, {});
    //     let imgData = canvas.toDataURL("image/png");
    //     doc.addImage(imgData, "PNG", 20, 130, 510, 297);
    //     document.body.removeChild(iframe);
    
    doc.save('Video Notes');
  //   console.log(notes
  //     .filter((note) => note.videoid === embedId))
  //   const string = renderToString(<Prints />);
  //   console.log(string)
  //  //const path="C:/Users/NADA HEGAZY/Downloads/CourseCertificate.pdf"
  //   var doc = new jsPDF("p", "pt", "A4");
  //   doc.html(string,{
  //       callback: function (doc) {
  //         doc.save('Video Notes');
  //       },x:20,y:10
        
  //    })
      
  }
  const tooltip = (
    <Tooltip id="tooltip" >
      {progress<100?<p>you completed {progress}% of course content<br/> keep going to get your<strong> Certificate</strong></p>:<p >CONGRATULATIONS!<br/> you have completed 100% of the course content</p>} 
    </Tooltip>
  );

  return (
    <div className="courseContainer">
      <div className="position-relative">
      <Link to={`/course/${course._id}`}><h2>{course.title} course</h2></Link>
      <div className="progress" style={{height: "5px"}}>
        <div className="progress-bar" role="progressbar" aria-label="Basic example" style={{width:`${progress}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      
      <OverlayTrigger placement="top" overlay={tooltip} >
      <EmojiEventsIcon fontSize="large" style={progress<100?{position:"absolute",right:"2px",top:"12px",color:"grey"}:{position:"absolute",right:"2px",top:"12px",color:"gold"}} />
      </OverlayTrigger>
          
      </div>
      <div style={{ padding: "20px" }}>
        {" "}
        {!showQuiz ? (
          <div>
            {/* <iframe
              width="100%"
              height="485"
              src={`https://www.youtube.com/embed/${embedId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube" onStateChange={(e)=>{setTime(e.target.getCurrentTime())}
            /> */}
            <YouTube id="player" videoId={embedId} opts={opts} onReady={videoReady} onEnd={getTime}  onPause={getTime} />{" "}
            <p>{videoDescription} </p>
          </div>
        ) : (
          <Quiz subtitleId={subtitleId} user={user} courseId={courseId} exerciseId={exerciseId} />
        )}
      </div>
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home-tab-pane"
            type="button"
            role="tab"
            aria-controls="home-tab-pane"
            aria-selected="true"
          >
            Course Content
          </button>
        </li>

        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#contact-tab-pane"
            type="button"
            role="tab"
            aria-controls="contact-tab-pane"
            aria-selected="false"
          >
            Review
          </button>
        </li>
        { (
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile-tab-pane"
              type="button"
              role="tab"
              aria-controls="profile-tab-pane"
              aria-selected="false"
            >
              Notes
            </button>
          </li>
        )}
      </ul>
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="home-tab-pane"
          role="tabpanel"
          aria-labelledby="home-tab"
          tabindex="0"
        >
          <Accordion defaultActiveKey="">
            {subtitles.map((sub, index) => {
              return (
                <Accordion.Item eventKey={index}>
                  <Accordion.Header>{sub.title}</Accordion.Header>
                  <Accordion.Body>
                    <div>
                      <ListGroup>
                        {sub.videos.map((vid, index) => {
                          return (
                
                            <ListGroup.Item
                              value={index}
                              action
                              onClick={(e) => {
                                //console.log("clicked")
                                setVideoId(vid._id);
                                setEmbedId(
                                  vid.videoURL.split("v=")[1].split("&")[0]
                                );
                                setVideoDescription(vid.description);
                                setShowQuiz(false);
                                setPreview(false);
                                setSubtitle(sub.title);
                              }}
                            >
                              {videosWatched.includes(vid._id)&&<CheckCircleOutlineIcon fontSize="small" color="action"/>}
                              {"  "}lesson video {index + 1}
                              {/* <AddCircleOutlineIcon id={sub._id} onClick={handleExerForm}></AddCircleOutlineIcon> //to add video */}
                            </ListGroup.Item>
                          );
                        })}
                      </ListGroup>
                    </div>
                    <div>
                      <ListGroup>
                        {sub.exercises.length > 0 ? (
                          <div>
                          <ListGroup.Item
                            id={sub._id}
                            action
                            onClick={(e) => {
                              setShowQuiz(true);
                              setSubtitleId(sub._id);
                              setExerciseId(sub.exercises[0]._id)
                            }}
                          >
                            {exercisesSolved.includes(sub.exercises[0]._id)?<CheckCircleOutlineIcon fontSize="small" color="action"/>:null}

                            Exercises
                          </ListGroup.Item>
                          </div>
                        ) : null}
                      </ListGroup>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </div>
        
        <div
          class="tab-pane fade"
          id="profile-tab-pane"
          role="tabpanel"
          aria-labelledby="profile-tab"
          tabindex="0"
        >{Array.isArray(notes)&& notes.length>0?<DownloadForOfflineIcon onClick={downloadNotes} className="iconButton" fontSize="large"style={{width:"100px",float:"right",marginTop:"20px"}}></DownloadForOfflineIcon>:<></>}
          {!preview?
          <div style={{ padding: "10px" }}>
            {!showEditor ? (
              Array.isArray(notes) &&
              notes.filter((note) => note.notetime === time).length !== 0 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginTop: "10px",
                    marginLeft: "100px",
                  }}
                >
                  <Button
                  variant="outline-secondary"
                    type="button"
                    style={{
                      padding: "10px",
                      width: "75%",
                      textAlign: "left",
                    }}
                    onClick={() => {
                      setShowEditor(true);
                      setnoteTime(time);
                      setShowEdit(true);
                    }}
                  >
                    Edit your note at {time}{" "}
                    <span style={{ float: "right" }}>
                      <EditIcon
                        style={{ alignContent: "right" }}
                        className="ms-auto me-3"
                      ></EditIcon>
                    </span>
                  </Button>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginTop: "10px",
                    marginLeft: "100px",
                  }}
                >
                  <Button
                  variant="outline-secondary"
                    type="button"
                    style={{
                      padding: "10px",
                      width: "75%",
                      textAlign: "left",
                    }}
                    onClick={() => {
                      setShowEditor(true);
                      setnoteTime(time);
                    }}
                  >
                    Create a new note at {time}{" "}
                    <span style={{ float: "right" }}>
                      <AddIcon
                        style={{ alignContent: "right" }}
                        className="ms-auto me-3"
                      ></AddIcon>
                    </span>
                  </Button>
                </div>
              )
            ) : (
              <div class="row" style={{ padding: "10px" }}>
                <div>
                  <Button
                    type="button"
                    style={{width:"70px", borderRadius: "25px", padding: "5px" }}
                    disabled
                  >
                    {notetime}
                  </Button>
                  <div id="editor" style={{ width: "90%", float: "right" }}>
                    <CKEditor
                      editor={ClassicEditor}
                      data=""
                      onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        //console.log("Editor is ready to use!", editor);
                      }}
                      onChange={(event, editor) => {
                        const data = parse(editor.getData()).props.children;
                        setText(parse(data));
                        console.log({ event, editor, data });
                        console.log(text);
                      }}
                      onBlur={(event, editor) => {
                        console.log("Blur.", editor);
                      }}
                      onFocus={(event, editor) => {
                        console.log("Focus.", editor);
                      }}
                    />
                  </div>
                </div>
                <div
                  class="row"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                  variant="outline-secondary"
                    type="button"
                    style={{ marginTop: "10px", width: "15%" }}
                    onClick={() => {
                      setShowEditor(false);
                    }}
                  >
                    {" "}
                    Cancel
                  </Button>{" "}
                  {!showEdit ? (
                    <Button
                      type="button"
                      style={{
                        marginTop: "10px",
                        width: "15%",
                        marginLeft: "5px",
                      }}
                      onClick={Addnote}
                    >
                      {" "}
                      Save Note
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      style={{
                        marginTop: "10px",
                        width: "15%",
                        marginLeft: "5px",
                      }}
                      onClick={(e) => editNote(notetime)}
                    >
                      {" "}
                      Edit Note
                    </Button>
                  )}
                </div>
              </div>
            )}{" "}
            <div className="container d-grid my-5">
              {/* <h3>My Notes</h3> */}
              <div className="row p-0 ">
                {Array.isArray(notes) &&
                  notes
                    .filter((note) => note.videoid === embedId)
                    .map((obj) => {
                      return (
                        <div className="row">
                          <div className="col-1 md-2">
                            <Button
                              type="button"
                              style={{
                                borderRadius: "25px",
                                padding: "5px",
                                width: "60px",
                                marginRight: "10px",
                              }}
                              onClick={(e) => {
                                Seekto(obj.notetime);
                              }}
                            >
                              {obj.notetime}
                            </Button>
                          </div>

                          <div className="col px-4 py-3 ">
                            <h5 className=" fw-bold mt-1 mb-0"> {subtitle}</h5>

                            <Card style={{ width: "600px", float: "center" }}>
                              <Card.Header
                                style={{ height: "40px" }}
                                className="d-flex px-2 border-top"
                              >
                                <h6 className=" mt-1.5 mb-0">
                                  {" "}
                                  {videoDescription}{" "}
                                </h6>
                                <div className="ms-auto mt-0">
                                  <EditIcon
                                    className="iconButton"
                                    onClick={(e) => {
                                      setnoteTime(obj.notetime);
                                      setShowEditor(true);
                                      setShowEdit(true);
                                      document
                                        .getElementById("editor")
                                        .scrollIntoView({
                                          behavior: "auto",
                                          block: "center",
                                        });
                                    }}
                                  ></EditIcon>

                                  <DeleteIcon
                                    className="iconButton"
                                    onClick={(e) => deleteNote(obj.notetime)}
                                  ></DeleteIcon>
                                </div>
                              </Card.Header>
                              <Card.Body className="px-2 my-0">
                                <p>{parse(obj.note)}</p>
                              </Card.Body>
                            </Card>
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
          :<div className="p-3 text-center"><h5>please choose a video to view its notes</h5></div>}
        </div>
        <div
          class="tab-pane fade"
          id="contact-tab-pane"
          role="tabpanel"
          aria-labelledby="contact-tab"
          tabindex="0"
        >
          <div>
            <div style={{ padding: "10px" }} className="addReviewDiv  container">
              <Form style={{ width: "500px" }} onSubmit={submitReview}>
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
                <div className="d-flex">
                <Button type="submit" className="ms-auto">submit review</Button>
                </div>
              </Form>
            </div>
          </div>
          {/* <div class="tab-pane fade" id="disabled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab" tabindex="0">...</div> */}
        </div>
      </div>
    </div>
  );
}

export default RegisteredCourse;
