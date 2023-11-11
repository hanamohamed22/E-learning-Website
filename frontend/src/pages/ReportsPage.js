
import {Link ,Navigate,useParams} from "react-router-dom";
import axios from "axios";
import {React,useState,useMemo,useEffect} from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useAuthContext } from '../hooks/useAuthContext'
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';


const ReportsPage=()=>{
        const {user} = useAuthContext();
        console.log(user)
        const [report,setReport]=useState([]);
        const [flag,setFlag]=useState(false);
        const [myReport ,setMyReport] = useState ({});
        const [followUp , setFollowUp] = useState ("");
        const[showAdminMssg,setShowAdminMssg]=useState(false);

        
        const handleInsertionFollowUp =async (e,req)=> {
                setFlag(!flag);
                
        }
        const handleSubmit = async (e) => {
            e.preventDefault();
            const response = await axios.patch(`/insertingFollowUp?id=${myReport._id}&follow=${followUp}`);
          };
          
        useEffect(() => {

        const fetchReport=async()=>{
            console.log("hello")
          if((user)&&(user.message === "corporateTrainee")){
            console.log("hi");
            const response = await axios.get(`/corpviewReports?id=${user.user._id}`);
            if (response) {
                setReport(response.data);
                console.log(response.data)
                
        }
    }
    else if((user)&& (user.message==="instructor")){
        const response = await axios.get(`/instructorviewReports?userid=${user.user._id}`);
            if (response) {
                console.log("salma2")
                setReport(response.data);
                console.log("salma");
                console.log(response.data)
                
        }
    }  else if((user)&& (user.message==="individualTrainee")){
        const response = await axios.get(`/individualviewReports?userid=${user.user._id}`);
            if (response) {
                console.log("salma3")
                setReport(response.data);
                console.log("salma4");
                console.log(response.data)
                
        }
    }

        
    
}
        fetchReport();
   
        
    },[user]);

    
        
        return(
            
        <div>
          <div className="bgCard">
            {report.length>0?
            <div>
                <h3 style={{ fontWeight: 'bold' } } >My Reports </h3>
                <br/>
                <Table striped >
                <thead>
                <td style={{ fontWeight: 'bold' }} >
                    Course
                    </td>
                    <td style={{ fontWeight: 'bold' }} >
                        Content
                    </td>
                    <td style={{ fontWeight: 'bold' }} >
                        Status
                    </td>

                    <td style={{ fontWeight: 'bold' }} >
                        Follow Up
                    </td>
                    
                </thead>
                <tbody>
                    {
                    // report.map(ref=>{ return (
                report.map((req)=>{ return (
                    <tr >
                        <td>{req.course.title}</td>
                        <td>{req.content}</td>   
                        <td>
                            {(req.status==='pending'&&req.adminMessage)?
                            <Link className="position-relative" onClick={()=>{setMyReport(req);setShowAdminMssg(true)}}>  
                            <FiberManualRecordIcon sx={{ fontSize: "10px",color: "green" }}/>pending 
                            </Link>:req.status}
                        </td>                         
                        <td>{req.followUp? req.followUp:req.status!="resolved"&&<Link><AddCircleOutlineIcon className=" " onClick={()=>{setMyReport(req);handleInsertionFollowUp();}}  /></Link>} </td>
                    </tr>

                    )})}
                </tbody>
                </Table>
                
                
            </div>:
            <div >
            <h2>
                My Reports
            </h2>
            <p>You have not issued any reports </p>
            
            </div>}
            </div>

        <Modal show={flag} onHide={handleInsertionFollowUp} className="modal " >
         <Modal.Header closeButton ><h4>Follow Up</h4></Modal.Header>
            <Modal.Body className=" text-center container ">
                <p>your follow up will be sent to the admin</p> 
                <Form onSubmit={handleSubmit} > 
                <Form.Control
                as="textArea"
                placeholder="Type here... "
                className="followUp"
                onChange={(e) => {
                    setFollowUp(e.target.value);
                    console.log(e.target.value);
                    
                }}
                value={followUp}
              
                />
                <br/>  
                <Button variant="btn btn-primary" type="submit" className=" w-25 m-3"  onClick={handleInsertionFollowUp}>Confirm</Button>
                <Button variant="btn btn-outline-secondary" className=" w-25 m-3" onClick={handleInsertionFollowUp}>Cancel</Button>

                </Form> 
            
            </Modal.Body>
        </Modal>

        <Modal show={showAdminMssg} onHide={()=>{setShowAdminMssg(false)}} className="modal " >
         <Modal.Header closeButton ><h4>Admin Message</h4></Modal.Header>
            <Modal.Body className=" text-center container ">
                <p>{myReport.adminMessage}</p> 
                
                <Button variant="btn btn-primary" type="submit" className=" w-25 m-3"  onClick={()=>{setShowAdminMssg(false)}}>Ok</Button>
            
            </Modal.Body>
        </Modal>
        


        </div>

    

        )
    }

    export default ReportsPage;
