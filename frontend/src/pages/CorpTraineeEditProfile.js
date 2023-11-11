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
import { useAuthContext } from '../hooks/useAuthContext'
import AlertModal from "../components/AlertModal";

    const CorpTraineeEditProfile=()=>{
        
        const { id } = useParams();
        const { user } = useAuthContext();
        console.log("loading course of id: "+id);
        //const id="63555273715365376d67988d";
        const [corptrainee,setCorpTrainee]=useState({});
        const [oldPassword,setOldPassword]=useState('');
        const [newPassword,setNewPassword]=useState('');
        const [confirmedNewpassword,setConfirmedNewPassword]=useState('');
        const [error,setError]=useState("")
        const [success,setSuccess]=useState("")
        const navigate = useNavigate();
        const [flag,setFlag]=useState(true);
        
  const[showAlert,setShowAlert]=useState(false);
  const [alertMssg,setAlertMssg]=useState("");


    useEffect(() => {

        const fetchCorpTrainee = async () => {
            const response = await axios.get(`/viewCorpTrainee?id=${id}`);
            if (response) {
                setCorpTrainee(response.data.corptrainee);
            }
            else{
              //  alert("errorrrrrrr");
            }
        };
        fetchCorpTrainee();

    },[id]);
    useEffect(()=> {

    },[error,success,alertMssg])

    const checkOldPassword = async (e) =>{
        e.preventDefault();
        console.log("checkold")
        if (oldPassword!==""){
       const response=  await axios.post(`/checkpassword`,
      { OldPassword: oldPassword,
      DataBasePassword: corptrainee.password});
       console.log(response.data)
       if(!response.data){
           setFlag(false);
            console.log(oldPassword);
            setOldPassword ('');
            setNewPassword('');
            setConfirmedNewPassword('');
            console.log(oldPassword);
            e.preventDefault();
            //alert("old password is incorrect")
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
        //alert("please fill all the required fields")
        setSuccess("")
        setError("Please fill all the required fields")
    }
        
    }
    const compareNewWithConfirmed = async()=>{
        if ((newPassword!==confirmedNewpassword) || (newPassword==="" || confirmedNewpassword==="")){
            //alert("Passwords you have entered does not match");  
            setError("Passwords enter matching passwords")
            setSuccess("")
            setNewPassword('');
            setConfirmedNewPassword('');
        }
        else{
            try {
             const response=  await axios.patch(`/updatePasswordCorpTrainee?id=${id}`, 
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
            alert("Couldn't change password");
        
        }
    }
}
    const checkWhenSubmitted =(e)=>{
        e.preventDefault();
        checkOldPassword();
        
        if (flag){
        compareNewWithConfirmed();
        }
        e.preventDefault();
    }
    const handleChange=(e)=>{
        const{name,value}=e.target
        console.log(name+"  "+value);
        setCorpTrainee({...corptrainee, [name]:value});
        console.log(corptrainee);
        
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response=await axios.patch("/updateCorpTrainee", {
                updatedCorpTrainee:corptrainee
            });

            if (response) { 
                setShowAlert(true);
                setAlertMssg("Updated Successfully")
                //window.location.href=`/editCorpTrainee/${id}`
            }

            
          } catch (err) {
            alert("Couldn't edit profile");
          }
        navigate(`/editCorpTrainee/${id}` )
    }

   

        
        return(
            
        <div className="container-xl px-4 mt-4">
            <Tabs style={{backgroundColor:"transparent"}} defaultActiveKey="first">
                <Tab eventKey="first" title="Personal Info">
                    <EditCorporateTraineeForm handleSubmit={handleSubmit} handleChange={handleChange} corptrainee={corptrainee} id={id}/>
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

    <AlertModal show={showAlert} hide={()=>{setShowAlert(false)}} message={alertMssg}/>

    </div>

    

        )
    }

    export default CorpTraineeEditProfile;
