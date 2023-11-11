import axios from "axios";
import {useState} from 'react'
import {Link} from'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useLogin } from "../hooks/useLogin"
import { useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
//import axios from 'axios';
import { useAuthContext } from "../hooks/useAuthContext";
import{useNavigate} from 'react-router-dom';
import Contract from "../components/Contract";
const Login = (props) => {
  const {user}=useAuthContext();
 const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const {login, error, isLoading} = useLogin()
const [showfirstLogin, setShowfirstLogin] = useState(false);
const [showContract, setShowContract] = useState(false);
const [showfirsttime, setshowfirsttime] = useState(false);
const navigate = useNavigate();
useEffect(()=>{

},[showfirstLogin,showContract])
console.log(user)
useEffect(()=>{

  const viewInstructor = async () => {
    const response = await axios.get(`/viewInstructor/?id=${user.user._id}`);
    if (response) {
      console.log(response.data)
      if(response.data.instructor.flag)
      window.location.href=`/`;
    }
  };
  const fetchCorpTrainee = async () => {
    const response = await axios.get(`/viewCorpTrainee?id=${user.user._id}`);
    if (response) {
        if(response.data.corptrainee.flag)
        window.location.href=`/`;
    }
    
};
if (user){
  fetchCorpTrainee();
   viewInstructor();
}
},[user]);


const handleLogin= async (e)=>{
    e.preventDefault() //when we submit a form the default is to refresh
    const result=await login(name, password)
    console.log(result)
   
    if (result.message==="individualTrainee"){
    //if (window.history.length<=2){
      console.log(result)
   // props.setTheUser(result);
    if (result){
      window.location.href=`/`;
   // props.setTheId(result.individualuser._id);
    }
    // else{
    //   props.setTheId(null);
    // }
    //  this.props.parentCallback(result.individualuser._id);
  
   // }
    // else{
    //   window.history.go(-1);
    // }
    //console.log(window.history.location);
  }
else if (result.message==="corporateTrainee"){
  //if (window.history.length===1){
  //  window.location.href=`/`;
//  }
setshowfirsttime(true);
  const response = await axios.get(`/viewCorpTrainee?id=${result.user._id}`);
  if (response) {
      if(!response.data.corptrainee.flag)
      setShowfirstLogin(true);
      else{
        setshowfirsttime(true);
        window.location.href=`/`;
       // setShowfirstLogin(false);
      }
  }
  

  // else{
  //   window.history.go(-1);
  // }
}

  else if (result.message==="instructor"){
   
    console.log("instr")
    const response = await axios.get(`/viewInstructor/?id=${result.user._id}`);
    if (response) {
     console.log("FLAGGG"+response.data.instructor.flag)
      if(!response.data.instructor.flag)
        setShowContract(true);
        else{
          setshowfirsttime(true);
          window.location.href=`/`;
         // setShowContract(false);
        }

    }
    //if (window.history.length===1){
    
    //}
    // else{
    //   window.history.go(-1);
    // }
  }
  else if (result.message==="admin"){
    window.location.href=`/1`;
  }
}

// const getInstructor = async (id) => {
//   const response = await axios.get(`/viewInstructor/?id=${id}`);
//   if (response) {
//     if(response.data.instructor.flag)
//     window.location.href=`/instructor/id=${id}`;
//   }
//   else{
//     window.location.href='/instructorFirstLogin';
//   }
// };



    //window.history.back()
   // window.history.go(-1);
    //console.log(window.history.forward);
    // try {
    //     const response = await axios.post('/login', {
    //      //email: email,
    //       name: name,
    //       password: password
    //     });
    //     console.log(response);
    //     console.log(response.data.instructoruser._id); //id
    //   if (response.data.message==="individual"){
    //   //  window.location = 'new url'
    //   window.location.href=`/trainee/id=${response.data.individualuser._id}`;
    //    }
    //   else if (response.data.message==="corporate"){
    //    // console.log("anahena")
    //     window.location.href=`/corporate/id=${response.data.corporateuser._id}`;
    //   }
    //    else if(response.data.message==="instructor"){
    //     window.location.href=`/instructorProfile/id=${response.data.instructoruser._id}`;
    //   }
    //    else{
    //      alert("failed");
    //    }
        
    // }
    // catch{
    //    alert("failed");
    // }
  
return (
    <div>
 
    <Form className="login" onSubmit={handleLogin}>
        {/* <h3>Log in</h3> */}
        <h3>Login</h3>
        <label>Username:</label>
        <Form.Control
        placeholder="Enter your username" 
        type="text"
        onChange={(e)=>setName(e.target.value)}
        value={name} // to make changes outside this part reflect in here as well
        className="mb-3"
        />
        <br></br>
<label>Password:</label>
        <Form.Control 
        type="password"
        placeholder="Enter your password"
        onChange={(e)=>setPassword(e.target.value)}
        value={password} // to make changes outside this part reflect in here as well
       
        />

        <div style={{alignItems:"center",textAlign:"center"}}>
        <Button type="submit" className="m-3" disabled={isLoading}>Log in</Button>
      {error && <div className="error">{error}</div>}
        </div>
      <Link to="/forgotpassword" style={{textAlign:"right"}}>Forgot Password?</Link>
    </Form>
    <Modal show={showfirstLogin}>
        <Modal.Title><label className='text-primary'>Welcome To CCC Courses</label></Modal.Title>
            <Modal.Body>
               <p>you will be directed to your profile page to edit your personal info and password</p>
                    
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary"  onClick={()=>{navigate(`/editCorpTrainee/${user.user._id}`)}}  > Okay </Button>
            </Modal.Footer>
      </Modal>
      <Modal show={showContract}>
        <Contract
          show={() => {
            setShowContract(false);
            console.log("heyyyyyyyyyyyyyy");
          }}
        />
      </Modal>
  </div>
)
}

export default Login;