
import { useEffect, useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import noRefundImg from '../images/no-refund.jpg'


    const RequestAccessForm=(props)=>{

        const {courseId,studentId}=props;
        const[requested,setRequested]=useState(false); 
   
       useEffect(() => {

        const fetchRequests = async () => {
            const response = await axios.get(`/getStudentAccessRequests?studentId=${studentId}&courseId=${courseId}`);
            console.log(response.data);
            if (response.data.length>0) {
                setRequested(true);
            }
        };
        fetchRequests();

    },[]);
    
    const handleSubmit = async (e) => {
        e.preventDefault()
            
            try {
                const res=await axios.post("/requestAccess", {
                    courseId, studentId
                });
            console.log(res)
            
            } catch (err) {
                alert("err:Couldn't request access");
            }

        }
        
      
   
    
    return (
    <div className=" text-center  ">
        <Modal.Header closeButton >
            <Modal.Title>Request Access</Modal.Title>    
        </Modal.Header>
       

        {requested?<div>
            <Modal.Body>
            <h4>request already sent</h4>
            </Modal.Body>
        </div>:<Form className="create"  onSubmit={handleSubmit} >
        <Modal.Body>
        <h4>Are you sure you want to access to this course?</h4>
        <p>A request will be sent to the admin as soon as you confirm</p>
        <Button variant="primary" type="submit" onClick={props.onHide} className=" w-25 m-3">Yes</Button>
        <Button variant="outline-secondary" onClick={props.onHide}className=" w-25 m-3" >Cancel</Button>


        </Modal.Body>
        
        
        </Form>}

        
        
    
     
    </div>
    
    )
}
export default RequestAccessForm;