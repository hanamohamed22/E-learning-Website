import { useEffect, useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';

import AdminForm from '../components/AdminForm';
import CorporateTraineeForm from '../components/CorporateTraineeForm';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import {  Link } from "react-router-dom";
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Accordion from "react-bootstrap/Accordion";
import AlertModal from "../components/AlertModal";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Form from 'react-bootstrap/Form';




const Admin=()=>{
    
    const [courses, setCourses] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [corporateTrainees, setCorporateTrainees] = useState([]);
    const [individualTrainees, setIndividualTrainees] = useState([]);
    const [refundRequests, setRefundRequests] = useState([]);
    const [accessRequests, setAccessRequests] = useState([]);
    
    const [request,setRequest]=useState({});
    const[showReject,setShowReject]=useState(false);
    const[showRejectRefund,setShowRejectRefund]=useState(false);

    const[refresh,setRefresh]=useState(false);
    const [reports, setReports] = useState([]);
  const[showSubjectsModal,setShowSubjectsModal]=useState(false);
    const [subjects, setSubjects] = useState([]);
    const [newSubject,setNewSubject]=useState("");







    useEffect(() => {

        const fetchCourses = async () => {
            const response = await axios.get('/courses');
            if (response) {
                setCourses(response.data); 
            }
        };

        const fetchInstructors = async () => {
            const response = await axios.get(`/instructors?q=${""}`);
            if (response) {
                setInstructors(response.data);
            }
        };
        const fetchRefundRequests = async () => {
          const response = await axios.get('/getRefundRequests');
          if (response) {
            console.log(response.data)
            setRefundRequests(response.data);
          }
      };
      const fetchAccessRequests = async () => {
        const response = await axios.get('/getAccessRequests');
        if (response) {
          setAccessRequests(response.data);
        }
    };
    const fetchCorporateTrainees = async () => {
      const response = await axios.get(`/viewCorpTrainees?q=${""}`);
      if (response) {
        setCorporateTrainees(response.data);
      }
  };
  const fetchIndividualTrainees = async () => {
    const response = await axios.get(`/viewTrainees?q=${""}`);
    if (response) {
      console.log(response.data)
      setIndividualTrainees(response.data);
    }
};
    const fetchAllReports = async () => {
      const response = await axios.get(`/adminViewReports`);
      if (response) {
        console.log(response)

          setReports(response.data)

    }}
    const fetchSubjects =async ()=>{
      const response=await axios.get('/findsubjects');
      console.log(response.data);
      
      if(response){
          setSubjects(response.data)
          }
      }

    fetchCourses();
    fetchInstructors();
    fetchRefundRequests();
    fetchAccessRequests();
    fetchCorporateTrainees();
    fetchIndividualTrainees();
    fetchAllReports();
    fetchSubjects();

  }, [refresh]);

  const[showAddAdminForm,setShowAddAdminForm]=useState(false)
  const handleAddAdmin=async(e)=>{
    setShowAddAdminForm(!showAddAdminForm);
  }
  const submitSubject=async (req)=>{
    const response = await axios.post('/addSubject',{newSubject});
    if(response){
      setSubjects(...[subjects],newSubject);
      setNewSubject("");
      setRefresh(!refresh);}
}
  const handleAccessAccept=async (req)=>{
      const response = await axios.post('/acceptAccessRequest',{request:req});
      if(response){
        setRefresh(!refresh);
      }
  }
  const handleRefundAccept=async (req)=>{
    const response = await axios.post('/acceptRefundRequest',{request:req});
    if(response)
  setRefresh(!refresh);
}
const handleAccessReject=async ()=>{
  
  const response=await axios.patch('/rejectAccessRequest',{request});
  if(response)
  setRefresh(!refresh);
}
const handleRefundReject=async ()=>{
  const response = await axios.patch('/rejectRefundRequest',{request});
  if(response)
  setRefresh(!refresh);
}
const [adminMssg,setAdminMssg]=useState("");
const[report,setReport]=useState({});
const [showAdminMssg,setShowAdminMssg]=useState("")
const  handlePendingReport = (req )=>{
  setReport(req);
  setShowAdminMssg(true);

  
}

const  sendPendingReport = async ( )=>{
  setShowAdminMssg(false);
  setAdminMssg("");
  const response = await axios.patch('/pendingReport',{request:report,adminMessage:adminMssg});
  
  if (response) {
    console.log(response.data)
    setRefresh(!refresh);

  }
}


const  handleResolveReport = async (req , res )=>{
  const response = await axios.patch('/resolvingReport',{request:req});
  
  if (response) {
    console.log(response.data)
    setRefresh(!refresh);

  }
}

return(
    <div className="container">
        <div className="px-2 d-flex">
        <h2>Admin Home Page</h2>
        <Button className=" ms-auto w-25" onClick={handleAddAdmin} size="lg" variant="primary"> Add Admin</Button>
        </div> 

        <div className=" mx-auto">
            <div className="row bgCard w-100">
            
              <Link to={'/AdminViewCourses'} style={{ textDecoration: 'none'}} className="bg-white  p-3 col-3 text-center" ><h1><MenuBookIcon  sx={{fontSize:60,color:"#747474"}}/></h1><h3>{courses.length} Courses</h3></Link>
              <Link to={'/AdminViewInstructors'} style={{ textDecoration: 'none'}} className="border-start bg-white  p-3 col-3 text-center"><h1><PersonIcon  sx={{fontSize:60,color:"#747474"}} /></h1><h3>{instructors.length} Instructors</h3></Link>
              <Link to={'/AdminViewStudents'} style={{ textDecoration: 'none'}} className="border-start bg-white  p-3 col-3 text-center"><h1><GroupsIcon   sx={{fontSize:60,color:"#747474"}} /></h1><h3>{corporateTrainees.length+individualTrainees.length} Total Students</h3></Link>
              <Link onClick={()=>{setShowSubjectsModal(true);}} style={{ textDecoration: 'none'}} className="border-start bg-white  p-3 col-3 text-center"><h1><LocalAtmIcon sx={{fontSize:60,color:"#747474"}} /></h1><h3> { subjects.length} Subjects </h3></Link>
            </div>
        </div>
        <div>

  <div className="bgCard w-100 pt-3">
        <Tab.Container defaultActiveKey="first" >
        <row>
          <Nav variant=" d-flex border-bottom" >
            <Nav.Item  className="col-2 border-end">
              <Nav.Link  eventKey="first">{accessRequests.length>0 && <FiberManualRecordIcon sx={{ fontSize: "10px",color: "green" }}/> } Access Requests</Nav.Link>
            </Nav.Item>
            <Nav.Item className="col-2 border-end">
              <Nav.Link eventKey="second">{refundRequests.length>0 && <FiberManualRecordIcon sx={{ fontSize: "10px",color: "green" }}/> } Refund Requests</Nav.Link>
            </Nav.Item>
            <Nav.Item className="col-2">
              <Nav.Link eventKey="third">{reports.length>0 && <FiberManualRecordIcon sx={{ fontSize: "10px",color: "green" }}/> } Reports </Nav.Link>
            </Nav.Item>
          </Nav>
        </row>
        
        <div>
          <Tab.Content className=" w-100 p-5">
            <Tab.Pane eventKey="first">
            <Table striped >
              {accessRequests.length>0?
                <tbody>
                    {accessRequests.map(req=>{ return (
                      <tr>
                      <div className="d-flex w-100">
                        <p className="text-start">{req.corporateTrainee.username} from {req.corporateTrainee.corporate} has requested access to {req.course.title} course</p>
                        <div className="ms-auto"><Link className="text-success" onClick={()=>{handleAccessAccept(req)}}>Accept</Link> | <Link className="text-reddy" onClick={()=>{ setShowReject(true); setRequest(req);}}>Reject</Link></div>
                        </div>
                      </tr>
                      

                    )})}
                </tbody>:<p>No new Access Requests</p>}
                    
                </Table>
              
            </Tab.Pane>
            <Tab.Pane eventKey="second">
            <div striped  className="requests-accords">

            
                    {refundRequests.length>0? 
                    <Accordion> 
                      {refundRequests.map((req,index)=>{ 
                        return (
                      req.individualTrainee&&
                     <Accordion.Item eventKey={index} >
                        <Accordion.Header>{req.individualTrainee.firstname} {req.individualTrainee.lastname} has requested refund to "{req.course.title}" course</Accordion.Header>
                        <Accordion.Body className="w-100 ps-5">
                        {req.comment&& <p className=" d-flex  text-secondary">commented: "{req.comment}"</p>} 
                        <div className="d-flex"> 
                        <p className="text-secondary" >value : {req.value}</p>
                        <div className="ms-auto"><Link className="text-success" onClick={()=>{handleRefundAccept(req)}}>Accept</Link> | <Link className="text-reddy" onClick={()=>{ setShowRejectRefund(true); setRequest(req);}}>Reject</Link></div>
                        </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    )})}
                    </Accordion> : <p>No New Refund Requests</p>}
                
                </div>
            </Tab.Pane>

            <Tab.Pane eventKey="third">
            <div striped  className="requests-accords">

            
                    {reports.length>0? 
                    <Accordion> 
                      {reports.map((req,index)=>{ 
                        return (
                      
                     <Accordion.Item eventKey={index} >
                        <Accordion.Header>{
                          req.instructor?<p className="text-start">Instructor "{req.instructor.name}"  issued a report concerning "{req.course.title}" course</p>:
                         <p>
                          {req.individualTrainee?<p className="text-start">Trainee "{req.individualTrainee.username}" issued a report concerning "{req.course.title}" course</p>:
                          <p>Corporate Trainee "{req.corporateTrainee.username}" issued a report concerning "{req.course.title}"" course </p>}
                           </p>} 
                           </Accordion.Header>
                            <Accordion.Body className="w-100 ps-5">
                            <p className=" d-flex  text-secondary">content: "{req.content}"</p>
                            <div className="d-flex"> 
                            {req.followUp&&<p className="text-secondary" >follow up : {req.followUp}</p>}
                            <div className="ms-auto "><Link onClick={()=>{handleResolveReport(req)}}>Resolved</Link> | <Link onClick={()=>{handlePendingReport(req)}}>Pending</Link></div>
                            </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    )})}
                    </Accordion> : <p>No New Refund Requests</p>}
                
                </div>
            </Tab.Pane>




            
            {/* <Tab.Pane eventKey="third">
            <Table striped >
                    {reports.length>0? 
                    <tbody> 
                      {reports.map(req=>{ return (
                      <tr  >
                        <div className="d-flex w-100 p-3 text-decoration-none">
                          {req.instructor?<p className="text-start">Instructor {req.instructor.name}  issued a report concerning {req.content}</p>:
                         <p>
                          {req.individualTrainee?<p className="text-start">Trainee {req.individualTrainee.username} issued a {req.content}  report</p>:
                          <p>Corporate Trainee  {req.corporateTrainee.username}  issued a {req.content}  report </p>}
                           </p>} 
                        <div className="ms-auto "><Link onClick={()=>{handleResolveReport(req)}}>Resolved</Link> | <Link onClick={()=>{handlePendingReport(req)}}>Pending</Link></div>
                        </div>
                      </tr>
                    )})}
                    </tbody> : <p>No New Reports</p>}
                
                    
                </Table>
            </Tab.Pane> */}
          </Tab.Content>
      </div>
    </Tab.Container>
    </div>  

            
            <br/>
            

            <Modal show={showAddAdminForm} onHide={handleAddAdmin}>
            <AdminForm show={handleAddAdmin} />
            </Modal>
        </div>

         <Modal show={showReject} onHide={()=>{setShowReject(false)}} className="modal-lg " >
         <Modal.Header closeButton ><h4>Reject request</h4></Modal.Header>
            <Modal.Body className=" text-center container ">
                <p>Are you sure you want to reject Request?</p>                
            
              <Button variant="btn btn-primary"className=" w-25 m-3"  onClick={()=>{handleAccessReject();setShowReject(false)}}>Confirm</Button>
              <Button variant="btn btn-outline-primary" className=" w-25 m-3" onClick={()=>{setShowReject(false)}}>Cancel</Button>
            </Modal.Body>
        </Modal>

        <Modal show={showRejectRefund} onHide={()=>{setShowRejectRefund(false)}} className="modal-lg " >
         <Modal.Header closeButton ><h4>Reject refund</h4></Modal.Header>
            <Modal.Body className=" text-center container ">
                <p>Are you sure you want to reject Refund?</p>                
            
              <Button variant="btn btn-primary"className=" w-25 m-3"  onClick={()=>{handleRefundReject();setShowRejectRefund(false)}}>Confirm</Button>
              <Button variant="btn btn-outline-primary" className=" w-25 m-3" onClick={()=>{setShowRejectRefund(false)}}>Cancel</Button>
            </Modal.Body>
        </Modal>

        <Modal show={showSubjectsModal} onHide={()=>{setShowSubjectsModal(false)}} className="modal" >
         <Modal.Header closeButton ><h4>Subjects</h4></Modal.Header>
            <Modal.Body className=" text-center container ">
              {subjects.length>0 ? subjects.map((subj)=>{ 
                return<div className="p-0 m-0"><p className="  mx-auto w-75 border rounded">{subj.subject}</p></div>
              }):<p>no subjects</p>}
                
            </Modal.Body>
            <Modal.Footer>
              <Form  className="w-75" >
              <Form.Control
                  type="text"
                  name="subject"
                  onChange={(e)=>{setNewSubject(e.target.value)}}  
                  value={newSubject} 
                 
                />
                </Form>
            <Link><AddCircleOutlineIcon  onClick={submitSubject}  /></Link>
            

            </Modal.Footer>
        </Modal>

        <Modal show={showAdminMssg} onHide={()=>{setShowAdminMssg(false)}} className="modal " >
         <Modal.Header closeButton ><h4>Pending Report</h4></Modal.Header>
            <Modal.Body className=" text-center container ">
                <p>Please specify</p>   
                <Form>
                  <Form.Control 
                  placeholder="message..." 
                  onChange={(e)=>{setAdminMssg(e.target.value)}}
                  value={adminMssg}/>
                </Form>             
            
              <Button variant="btn btn-primary"className=" w-25 m-3"  onClick={sendPendingReport}>send</Button>
            </Modal.Body>
        </Modal>

    </div>
    
)
}
export default Admin;