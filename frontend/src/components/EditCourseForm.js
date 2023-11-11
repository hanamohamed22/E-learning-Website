import { useEffect, useState } from "react";
import {Link ,Navigate,useParams} from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';


    const EditCourseForm=(props)=>{

        const {course}=props;
        //console.log(course);
        const [updatedCourse,setUpdatedCourse]=useState(course);
        const [error,setError]=useState("")
        const [success,setSuccess]=useState("");
        const [subjects,setSubjects]=useState([])

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
         

        const handleChange=(e)=>{
            const{name,value}=e.target
            console.log(updatedCourse)

            console.log(name+"  "+value);
            setUpdatedCourse({...updatedCourse, [name]:value});
            console.log(updatedCourse);
            
        }

        const handleSubmit = async (e) => {
            e.preventDefault();
    
            try {
                const response=await axios.patch("/updateCourse", {
                    updatedCourse
                });
                console.log(response)
                if (response) {
                    setSuccess("Course updated successfully")
                    setError("")
                }
    
                
              } catch (err) {
                setError("Could not update course")
                setSuccess("")
              }
        }

        return(
            <div>
                <Modal.Header closeButton>
                <Modal.Title>Edit Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                <div className="container-xl py-4 mt-1">  
                        <div className=" mx-auto">
                            
                            <div className="card mb-4">
                              
                                <div className="card-body w-75 mx-auto py-4">
                                    <Form onSubmit={handleSubmit}>
                                        
                                        <div className="mb-3">
                                            <label className="small mb-1">Title </label>
                                            <input className="form-control" 
                                            name="title" 
                                            type="text" 
                                            placeholder={updatedCourse.title}
                                            value={updatedCourse.title}
                                            onChange={handleChange}/>
                                        </div>
                                        
                                        <div className="mb-3 ">
                                            <label className="small mb-1 " >Price</label>
                                            <div className="  d-flex">
                                            <input className="form-control "
                                            name="price"
                                            type="text" 
                                            placeholder={updatedCourse.price}
                                            value={updatedCourse.price}
                                            onChange={handleChange}/><h5 className="p-1  pt-2">EGP</h5> </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="small mb-1" >Subject</label>
                                            <Dropdown onSelect={(e) =>setUpdatedCourse({...updatedCourse, subject:e})} >
                                            <Dropdown.Toggle className="filters w-100 " >{updatedCourse.subject}</Dropdown.Toggle>
                                                <Dropdown.Menu className=" w-100 text-center">
                                                {subjects.length>0?subjects.map((subj,index) => {return (<Dropdown.Item eventKey={subj.subject}>{subj.subject}</Dropdown.Item>)
                                                        }):"no subjects to show"}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                        
                                        <div className="mb-3">
                                            <label className="small mb-1" >Summary</label>
                                            <textArea className="form-control"
                                            name="summary"
                                            type="text"
                                            as="textArea"
                                            placeholder={updatedCourse.summary}
                                            value={"updatedCourse.summary"}
                                            onChange={handleChange}/>
                                        </div>

                                        <div className="mb-3">
                                            <label className="small mb-1" >Preview Video</label>
                                            <input className="form-control"
                                            name="video"
                                            type="lastname"
                                            placeholder={updatedCourse.video}
                                            value={updatedCourse.video}
                                            onChange={handleChange}/>
                                        </div>

                                        
                                        <div className="d-flex justify-content-end ">
                                       
                                        <button className="btn btn-primary me-2 " type="submit">Save changes</button>
                                        </div>
                                    </Form>
                                </div>
                                
                            </div>
                            <div className="text-center">
                            <p className="text-success">{success} </p>
                                 <p className="text-danger">{error}</p>
                            </div>
                       
                    </div>
                </div>
                </Modal.Body>
            </div>

        )
    }

    export default EditCourseForm;