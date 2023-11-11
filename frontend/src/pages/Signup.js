import {useState} from 'react'
import { useSignup } from '../hooks/useSignup'

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
const Singup = ()=> {
const [email, setEmail] = useState('')
const [firstname, setFirstName] = useState('')
const [lastname, setLastName] = useState('')
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [gender, setGender] = useState('')
const [modal, setShowModal] = useState(false)
const {signup, error, isLoading} = useSignup()

useEffect(() => {
},[modal])

const handleSubmit= async(e)=>{
  window.location.href=`/`;
}
const handleSignup= async (e)=>{
    e.preventDefault() //when we submit a form the default is to refresh
    console.log(username,password)
    
   const result= await signup(username, email, password,firstname, lastname,gender);
  console.log(result)
  // console.log(result._id)
   // console.log(window.history.go(-1));
   // console.log(window.history);
   if (result){
    setShowModal(true)
    console.log("ana gowa elif resultS")
  
   }
   //else{}
    // }
    // else{
    //   window.history.go(-1);
    // }
   // if (window.history.back)
   //window.history.back();
 //window.location.href=`/trainee/id=${result._id}`;
   
}
return (
  <div>
    <form className="signup" onSubmit={handleSignup}>
        <h3>Sign up</h3>
        <label>First Name:</label>
        <input 
        type="text"
        onChange={(e)=>setFirstName(e.target.value)}
        value={firstname} // to make changes outside this part reflect in here as well
        />
         <label>Last Name:</label>
        <input 
        type="text"
        onChange={(e)=>setLastName(e.target.value)}
        value={lastname} // to make changes outside this part reflect in here as well
        />
         <label>Email:</label>
        <input 
        type="email"
        onChange={(e)=>setEmail(e.target.value)}
        value={email} // to make changes outside this part reflect in here as well
        />
        <label>Username:</label>
        <input 
        type="text"
        onChange={(e)=>setUsername(e.target.value)}
        value={username} // to make changes outside this part reflect in here as well
        />     
       <label>Password:</label>
        <input 
        type="password"
        onChange={(e)=>setPassword(e.target.value)}
        value={password} // to make changes outside this part reflect in here as well
        />
        <label>Gender:</label>
        <FormControl fullWidth style={{backgroundColor:'white',borderColor:'grey'}}>
  
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={gender}
    label="gender"
    onChange={(e)=>setGender(e.target.value)}
  >
    <MenuItem value={"F"}>Female</MenuItem>
    <MenuItem value={"M"}>Male</MenuItem>
  </Select>
</FormControl>
        <br></br>
        <br></br>
        <Button type="su
        bmit" disabled={isLoading}>Sign up</Button>
      {error && <div className="error">{error}</div>}
      </form>
      <Modal show={modal}>
      <Modal.Title><label className='text-primary'>Welcome To CCC Courses</label></Modal.Title>
          <Modal.Body>
          <h5>Terms and Conditions</h5>
              <p>please read the following privacy policy and conditions thoroughlybefore accepting</p>
              <ul>
              <li>In general, imagery, video, and audio materials produced for and by the SHYNF Courses are considered public domain and not copyrighted within the Egypt and are available for use. 
                  For international use, please contact the Admin to request permission.
                  You may use SHYNF multimedia for education or informational purposes, 
                  including photo collections, public exhibits and internet web pages.  
                Some materials may contain a Copyright Notice. 
                 It is your responsibility to identify the copyright owner and to obtain permission before making use of this material.  </li> 
              <li> We have all the right to add/remove promotions on any course</li>
               </ul>   
          </Modal.Body>
          <Modal.Footer>
          <Button variant="primary"  onClick={(e)=>{handleSubmit(e)}}  > Accept </Button>
          </Modal.Footer>
    </Modal>
    </div>
)}

export default Singup;