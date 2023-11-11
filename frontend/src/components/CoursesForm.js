import { useEffect, useState } from "react";

import axios from "axios";

import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';

import SubtitleForm from "./SubtitleForm";


import Dropdown from 'react-bootstrap/Dropdown';


import Modal from 'react-bootstrap/Modal';

 

const CoursesForm = (props) => {

  const[displayCourseForm,setDisplayCourseForm]=useState(true);

  const [title, setTitle] = useState(""); //title

  const [price, setPrice] = useState(""); //price

  const [summary, setSummary] = useState(""); //summary

  const [subject, setSubject] = useState("");
  const [video, setVideo] = useState("");
  const [courseId,setCourseId]=useState("");
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false)


  useEffect(() => {

    const fetchSubjects =async ()=>{
      const response=await axios.get('/findsubjects');
      console.log(response.data);
      
      if(response){
          setSubjects(response.data)
          }
      }

      fetchSubjects();

  },[])
 

  const doneCourses= ()=>{

    setDisplayCourseForm((prev)=>{

      return(!prev);

    });

   

 

   console.log(displayCourseForm);
   console.log(props.show)
  

  }

 

  //const [error, setError] = useState("");

 

  const handleSubmit = async (e) => {

    e.preventDefault();

    // props.onSubmit();

 

    try {

      const res=await axios.post("/addcourse", {

        title: title,

        price:price,

        instructor:props.id,

        summary:summary,
        subject:subject,
        video:video

      })
     // console.log(res.data)
      //console.log(res.data._id);
      setCourseId(res.data._id);
      //console.log("hi: "+res);
      //alert("Course added successfully");

     

     

    } catch (err) {
      setError("Couldn't add Course")
     // alert("Couldn't add Course");

    }

      setTitle("");

      setPrice("");

      setSummary("");

      setSubject("");
      setVideo("");

  };
  return (

    <div>
      <div style={displayCourseForm ? { width: "100%" } : { display: "none" }}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Course</Modal.Title>
        </Modal.Header>
        <Form className="create p-3" onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Course Title: </Form.Label>
              <Form.Control
                placeholder="enter course title"
                type="text"
                onChange={(e) => setTitle(e.target.value)} //whenevr i write sth this funct is called
                value={title}
              />
            </Form.Group>
            
            <Form.Group className="">
              <Form.Label>Subject: </Form.Label>
              <Dropdown onSelect={(e) => setSubject(e)} >
              <Dropdown.Toggle className="filters w-100" >{subject===""?"subject" : subject}</Dropdown.Toggle>
                <Dropdown.Menu className=" w-100 text-center">
                  {subjects.length>0?subjects.map((subj,index) => {return (<Dropdown.Item eventKey={subj.subject}>{subj.subject}</Dropdown.Item>)
                        }):"no subjects to show"}
                  </Dropdown.Menu>
            </Dropdown>

            </Form.Group>

            <Form.Group>
              <Form.Label>Price: </Form.Label>
              <div className="  d-flex">
              <Form.Control
                placeholder="enter price"
                type="text"
                onChange={(e) => setPrice(e.target.value)} //whenevr i write sth this funct is called
                value={price}
              /><h5 className="p-1  pt-2">EGP</h5> </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Summary: </Form.Label>
              <Form.Control
                as="textArea"
                type="text"
                onChange={(e) => setSummary(e.target.value)} //whenevr i write sth this funct is called
                value={summary}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Course Preview Video Link: </Form.Label>
              <Form.Control
                placeholder="Enter course preview video link"
                type="text"
                onChange={(e) => setVideo(e.target.value)} //whenevr i write sth this funct is called
                value={video}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="d-flex justify-content-end ms-auto my-3"
              type="submit"
              onClick={doneCourses}
            >
              {" "}
              Add Course{" "}
            </Button>
          </Modal.Footer>
        </Form>
      </div>
       <div style={!displayCourseForm && success ? { width: "100%" } : { display: "none" }}>
       <SubtitleForm courseId={courseId} show={props.show}  /></div>
 <div>
          {/* Error modal */}
          <Modal show={error!==null}>
                <Modal.Header>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{error}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={(event)=>{setError(null);}}>Close</Button>    
                </Modal.Footer>
            </Modal>
            </div>
      
            

</div>
            

  );

};

 

export default CoursesForm;