
import { useEffect, useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import noRefundImg from '../images/no-refund.jpg'


    const RefundForm=(props)=>{

       const {courseId,studentId,progress,value}=props;
       const [comment,setComment]=useState(""); 
       const[requested,setRequested]=useState(false); 
   
       useEffect(() => {

        const fetchRequests = async () => {
            const response = await axios.get(`/getRefundRequests`);
            console.log(response.data);
            if (response) {
                const result=response.data.filter(req=>{ return req.individualTrainee._id===studentId&&req.course._id===courseId})
                console.log(result);
                if(result.length>0)
                setRequested(true);
            }
            else{
                alert("error while getting all requested refunds");
            }
        };
        fetchRequests();

    },[]);
   
    const handleSubmit = async (e) => {
        e.preventDefault()
            
            try {
                const res=await axios.post("/requestRefund", {
                    courseId, studentId,comment,value
                });
            console.log(res)
            
            } catch (err) {
                alert("err:Couldn't request refund");
            }

        }
        
      
   
    
    return (
    <div >
        <Modal.Header closeButton >
            <Modal.Title>Request Refund</Modal.Title>    
        </Modal.Header>
        {requested?
        ////////// if already requested
        <div className=" text-center container w-75">
            <Modal.Body>
            <h1 >Request is pending</h1>
            {/* <img style={{width:"15%"}} src={noRefundImg}></img> */}

            <p >your request to receive a refund has been submitted and you will be updated shortly </p>
            </Modal.Body>
        </div>:
        progress<=50?

        ///// request form 
        <div>
        <Form className="create"  onSubmit={handleSubmit} >
        <Modal.Body>
            <p className="text-primary"> Note that Refunds are only eligible if you have attended less than 50% of the course content </p>
            <p>Know that by requesting a refund you will not be able to access course content anymore unless you buy it again and in this case you will have to attend it form the beginning to be abl to receive your certificate</p>
            <br/>
            <h6>Tell us why you would like to request a refund</h6>
            <Form.Control
            as="textArea"
            type="text"
            name="title"
            onChange={(e)=>{setComment(e.target.value)}}  
            value={comment} 
            />
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" type="submit" onClick={props.onHide} >Submit</Button>
        </Modal.Footer>
        </Form>
        </div>:


        // ////can't request
        <div className=" text-center container w-75">
            <Modal.Body>
            <h1 >SORRY!</h1>
            <img style={{width:"15%"}} src={noRefundImg}></img>

            <p >you can not request a refund since you have attended more than 50% of the course content</p>
            </Modal.Body>
        </div>}
    
     
    </div>
    
    )
}
export default RefundForm;