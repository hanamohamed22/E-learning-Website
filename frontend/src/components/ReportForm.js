
import { useEffect, useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Checkbox } from '@mui/material';


const ReportForm=(props)=>{

  const {courseId,user,userType}=props;
  console.log(props);
        const [content ,setContent] =useState ("");
        
    const handleMessageChange = event => {
      setContent(event.target.value);
      console.log(event.target.value);
    }
        const handleReporting = async (e) => { 
            e.preventDefault()           
            
              if(userType==="corporateTrainee"){              
                const res=await axios.post("/corporateTraineeReporting", {
                    content,user,courseId

                });
              }
              else
                if(userType==="individualTrainee"){
                 const resp=await axios.post("/individualTraineeReporting", {
                    content,user,courseId

                });}
                else
                if(userType==="instructor"){
                 const resp=await axios.post("/instructorReporting", {
                    content,user,courseId

                });}


         }
        const handleChange = async(e) => {
          console.log(e.target)
            if (e.target.checked) {
              setContent(e.target.value);
              console.log('✅ Checkbox is checked');
            } else {
              console.log('⛔️ Checkbox is NOT checked');
            }
        }
        
    
    return (
    <div className=" text-center  ">
        <Modal.Header closeButton >
        </Modal.Header>
       

       <Form className="create"  onSubmit={handleReporting} >
        <Modal.Body>
        <h5>Please specify your problem </h5>
      <div>
      <label htmlFor="report">
        <input
          type="checkbox"
          value="technical"
          onChange={handleChange}
          name="report"
          checked={content === "technical"}

        />
        Technical 
      </label>
    </div>
    <br></br>
    <div>
      <label htmlFor="report1">
        <input
          type="checkbox"
          value="financial"
          onChange={handleChange}
          checked={content === "financial"}

        />
       Financial
      </label>
    </div>
    <br></br>
    <div>
      <label htmlFor="report2">
        <input
          type="checkbox"
          value="Other"
          onChange={handleChange}
          checked={content === "Other"}
        />
       Other 
      </label>
      {/* <div>
      <label htmlFor="message">Please Specify</label>
      <textarea
        id="message"
        name="message"
        onChange={handleMessageChange}
      />
    </div> */}
      <Form.Control
      className="w-75 mx-auto"
      disabled={content==="financial"||content==="technical"||content===""}
      as="textArea"
      placeholder="please specify"
      name="message"
      onChange={handleMessageChange}
      />

    </div>
        <br></br>
        <Button variant="primary" type="submit" onClick={props.onHide} className=" w-25 m-3">Submit</Button>
        <Button variant="outline-secondary" onClick={props.onHide}className=" w-25 m-3" >Cancel</Button>


        </Modal.Body>
        
        
        </Form>

        
        
    
     
    </div>
    
    )
}
export default ReportForm;