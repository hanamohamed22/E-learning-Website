import { useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

    const CorporateTraineeForm=(props)=>{
    const [username, setUsername]= useState(''); //title
    const [password, setPassword]= useState('') ;//subt
    const [email, setEmail]= useState('') ;
    const [fname, setFname]= useState('') ;
    const [lname, setLname]= useState('') ;
    const [corporate, setCorporate] = useState('')
    //const [error, setError]= useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()

        //const CorporateTrainee={username,password}
        try {
            await axios.post("/addcorporatetrainee", {
              username: username,
              password: password,
              email:email,
              firstname:fname,
              lastname:lname,
              corporate:corporate
            });
           // alert("Corporate Trainee added successfully");
            
          } catch (err) {
            alert("Couldn't add CorporateTrainee");
          }

        
    }
    return (
<Form className="create" onSubmit={handleSubmit}>
    <Modal.Header closeButton>
        <Modal.Title>Add New Corporate Trainee</Modal.Title>    
    </Modal.Header>
    <Modal.Body>
        <Form.Label>Username: </Form.Label>
        <Form.Control  
        type="text"
        id="username"
        onChange={(e)=> setUsername(e.target.value)}  //whenevr i write sth this funct is called
        value={username} 

        
        />
        <Form.Label>Password: </Form.Label>
        <Form.Control  
        type="password"
        onChange={(e)=> setPassword(e.target.value)}  //whenevr i write sth this funct is called
        value={password} 
        />
        <Form.Label>First Name: </Form.Label>
        <Form.Control  
        type="text"
        onChange={(e)=> setFname(e.target.value)}  //whenevr i write sth this funct is called
        value={fname} 
        />
        <Form.Label>Last Name: </Form.Label>
        <Form.Control  
        type="text"
        onChange={(e)=> setLname(e.target.value)}  //whenevr i write sth this funct is called
        value={lname} 
        />
        <Form.Label>Email: </Form.Label>
        <Form.Control  
        type="email"
        onChange={(e)=> setEmail(e.target.value)}  //whenevr i write sth this funct is called
        value={email} 
        />
          <Form.Label>Corporate: </Form.Label>
          <Form.Control  
        type="text"
        onChange={(e)=> setCorporate(e.target.value)}  //whenevr i write sth this funct is called
        value={corporate} 
        />
         
    </Modal.Body>
    <Modal.Footer>
        <Button type="submit" onClick={props.show}> Add </Button>
    </Modal.Footer>


</Form>

    )
}
export default CorporateTraineeForm;
