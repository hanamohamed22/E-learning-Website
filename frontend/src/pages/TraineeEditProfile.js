import { useEffect, useState } from "react";
import axios from "axios";
import {Link ,Navigate,useParams} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import{useNavigate} from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import EditInstructorForm from "../components/EditInstructorForm";
import EditCorporateTraineeForm from "../components/EditCorporateTraineeForm";
import EditTraineeForm from "../components/EditTraineeForm";
import { useAuthContext } from '../hooks/useAuthContext'

    const TraineeEditProfile=()=>{
        const [id,setId]=useState('')
        const { user } = useAuthContext();
        console.log(user)
        //const { id } = useParams();
        console.log("loading course of id: "+id);
        //const id="63555273715365376d67988d";
        const [trainee,setTrainee]=useState({});
        const [oldPassword,setOldPassword]=useState('');
        const [newPassword,setNewPassword]=useState('');
        const [confirmedNewpassword,setConfirmedNewPassword]=useState('');
        const [error,setError]=useState("")
        const [success,setSuccess]=useState("")
        const navigate = useNavigate();
        const [flag,setFlag]=useState(false);
      //  console.log(trainee)
    // useEffect(() => {
    //       if (flag){
    //        // alert("flag is true")
    //         compareNewWithConfirmed();
    //       } else{
    //        // alert("falseeeeeee")
    //       }
    //     },[flag])   
    useEffect(() => {
       
        const fetchTrainee = async () => {
            const response = await axios.get(`/viewTrainee?id=${user.user._id}`);
            if (response) {
                setId(user.user._id)
                setTrainee(response.data.trainee);
                console.log(response.data.trainee)
            }
            else{
                alert("errorrrrrrr");
            }
        };
       if(user){
        fetchTrainee();
       }
    },[user]);

    useEffect(()=> {
        
console.log("error"+error)
    },[error,success])
    const checkOldPassword = async (e) =>{
        e.preventDefault();
        console.log("oldpass"+oldPassword)
        if (oldPassword!==""){
       const response=  await axios.post(`/checkpassword`,
      { OldPassword: oldPassword,
        DataBasePassword: trainee.password});
       if(!response.data){
           setFlag(false);
            setOldPassword ('');
            setNewPassword('');
            setConfirmedNewPassword('');
           // alert("old password is incorrect")
           setError("Password entered is incorrect")
            setSuccess("")
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
        setSuccess("")
        setError("Please fill all the required fields")
    }
    }
    const compareNewWithConfirmed = async()=>{
        console.log(newPassword) 
        console.log(confirmedNewpassword)
        if ((newPassword!==confirmedNewpassword) || (newPassword==="" || confirmedNewpassword==="")){
            //alert("Passwords you have entered does not match");  4
            console.log(newPassword)
            console.log(confirmedNewpassword)
            setNewPassword('');
            setConfirmedNewPassword('');
            setError("Passwords enter matching passwords")
            setSuccess("")
            
        }
        else{
            try {
             const response=  await axios.patch(`/updatePasswordTrainee?id=${user.user._id}`, 
                { password:newPassword })
                if (response) {
                   // console.log("hh")
                   // alert("Changed successfullyyyy")
                   setSuccess("Password Changed Successfully")
                    setError("")
                    setOldPassword ('');
                    setNewPassword('');
                    setConfirmedNewPassword('');
                }
    
            }catch (err) {
            alert("Couldn't edit profile");
        
        }
    }
}
   
    const handleChange=(e)=>{
        const{name,value}=e.target
        console.log(name+"  "+value);
        setTrainee({...trainee, [name]:value});
        console.log(trainee);
        
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response=await axios.patch("/updateTrainee", {
                updatedTrainee:trainee
            });

            if (response) {
               // alert("updated successfullyyyy")
               setSuccess("Profile updated successfully")
               setError("")
                window.location.href=`/editTrainee/${user.user._id}`
            }

            
          } catch (err) {
            //alert("Couldn't edit profile");
            setError("Could not update profile, please make sure to fill all the required")
            setSuccess("")
          }
        navigate(`/editTrainee/${user.user._id}`)}

   

        
        return(
            
        <div className="container-xl px-4 mt-4">
            
            <Tabs style={{backgroundColor:"transparent"}} defaultActiveKey="first">
                <Tab eventKey="first" title="Personal Info">
                    <EditTraineeForm handleSubmit={handleSubmit} handleChange={handleChange} trainee={trainee} id={id}/>
                    </Tab>
                    <Tab eventKey="second" title="Security">  
                    
                               
        <div className="card my-4">
            <Form className=" mx-auto w-75 p-3">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                {success && <div className="error">{success}</div>}
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
            {error && <div className="error">{error}</div>}
        </Form>
    </div>
    </Tab>
                    
    </Tabs>
    </div>

    

        )
    }

    export default TraineeEditProfile;
