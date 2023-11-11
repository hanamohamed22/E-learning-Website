import { useEffect, useState } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import{useNavigate} from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import EditInstructorForm from "../components/EditInstructorForm";
import { useAuthContext } from '../hooks/useAuthContext'

    const InstructorEditProfile=()=>{
        const { user } = useAuthContext();
        console.log(user)
       
       // const { id } = useParams();
        //console.log("loading course of id: "+id);
        //const id="63555273715365376d67988d";
        const [instructor,setInstructor]=useState({});
        const [oldPassword,setOldPassword]=useState('');
        const [newPassword,setNewPassword]=useState('');
        const [confirmedNewpassword,setConfirmedNewPassword]=useState('');
        const [error,setError]=useState("")
        const [success,setSuccess]=useState("")
        const navigate = useNavigate();
        const [flag,setFlag]=useState(false);
        console.log("error"+error)
    useEffect(() => {
        
         const fetchInstructor = async () => {
            const response = await axios.get(`/viewInstructor?id=${user.user._id}`);
            if (response) {
                setInstructor(response.data.instructor);
            }
            else{
                alert("errorrrrrrr");
            }
        };
        if (user){
        fetchInstructor();
        }

    },[user]);
    useEffect(() => {
        
    
      },[error,success]) 

    const checkOldPassword  = async(e) =>{
      e.preventDefault();
       if (oldPassword!==""){
        const response=  await axios.post(`/checkpassword`,
      { OldPassword: oldPassword,
       DataBasePassword: instructor.password});
       console.log(response)
       if(!response.data){
            setFlag(false)
            setOldPassword ('');
            setNewPassword('');
            setConfirmedNewPassword('');
           // alert("old password is incorrect")
            setError("old password entered is incorrect")
            setSuccess("")
            e.preventDefault();
        }
        else if(response.data){
            setError("")
            setSuccess("")
            setFlag(true)
            compareNewWithConfirmed();
            
          // alert("correct old pass")
        }
    }
    else{
       // alert("please fill all the required fields")
        //setError("Please fill all the required fields")
        setSuccess("")
        setError("Please fill all the required fields")
    }
    }
    const compareNewWithConfirmed = async()=>{
    
       if ((newPassword!==confirmedNewpassword) || (newPassword==="" || confirmedNewpassword==="")){
            //alert("Passwords you have entered does not match");  
            setError("please enter matching passwords")
            setSuccess("")
            setNewPassword('');
            setConfirmedNewPassword('');
        }
        else{
            try {
             const response=  await axios.patch(`/updatePasswordInstructor?id=${user.user._id}`, 
                { password:newPassword })
                if (response) {
                    //alert("Changed successfullyyyy")
                    setSuccess("Password Changed Successfully")
                    setError("")
                    setOldPassword ('');
                    setNewPassword('');
                    setConfirmedNewPassword('');
                }
    
            }catch (err) {
           alert("Couldn't edit profile");
         //  setError("Could not change password, please contact the admin")
        
     }
    
}
}
  
    const handleChange=(e)=>{
        const{name,value}=e.target
        console.log(name+"  "+value);
        setInstructor({...instructor, [name]:value});
        console.log(instructor);
        
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response=await axios.patch("/updateInstructor", {
                updatedInstructor:instructor
            });
            console.log(response)
            if (response) {
                //alert("updated successfullyyyy")
                setSuccess("Profile updated successfully")
                setError("")
            }

            
          } catch (err) {
            //alert("Couldn't edit profile");
            setError("Could not update profile, please make sure to fill all the required")
            setSuccess("")
          }
        navigate(`/instructorprofile/${user.user._id}`)
    }
        return(
            
        <div className="container-xl px-4 mt-4">
              
            <Tabs style={{backgroundColor:"transparent"}} defaultActiveKey="first">
                <Tab eventKey="first" title="Personal Info">
                  { user?
                    <EditInstructorForm handleSubmit={handleSubmit} handleChange={handleChange} instructor={instructor} id={user.user._id}/>:<div></div>}
                    </Tab>
                    <Tab eventKey="second" title="Security">
                    <div className="card my-4">
            <Form className=" mx-auto w-75 p-3">
        <Form.Group className="mb-3" controlId="formBasicEmail">
        {success && <div className="error text-success">{success}</div>}
        <Form.Label>Old Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Your Old Password" onChange={(e) => setOldPassword(e.target.value)} 
        value = {oldPassword}/>
            
        </Form.Group>

        <Form.Group className="mb-3" >
        <Form.Label>New Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Your New Password" 
        onChange={(e) => setNewPassword(e.target.value)}
        value = {newPassword}/>
        
        </Form.Group>

        <Form.Group className="mb-3" >
        <Form.Label>Confirm New Password</Form.Label>
        <Form.Control type="password" placeholder=" Confirm New Password" 
        onChange={(e) => setConfirmedNewPassword(e.target.value)}
        value = {confirmedNewpassword}/>
        
        </Form.Group>
        <div className="d-flex justify-content-end ">
                <Button className="btn btn-primary me-2 "type="submit" onClick ={checkOldPassword}>
                Submit
            </Button>
            </div>
      {error && <div className="error text-danger">{error}</div>}
    </Form>
    </div>
    </Tab>
                    
    </Tabs>
    </div>

    

        )
    }

    export default InstructorEditProfile;
