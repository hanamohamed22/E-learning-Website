
import { useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



    const InstructorForm=(props)=>{
    const [username, setUsername]= useState(''); //title
    const [password, setPassword]= useState('') ;//subt
    const [name, setName]= useState('') ;
    const [email, setEmail]= useState('') ;
    //const [error, setError]= useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()

        //const admin={username,password}
        try {
            await axios.post("/addinstructor", {
              username: username,
              password: password,
              name: name,
              email:email
            });
            
            
          } catch (err) {
            alert("Couldn't add Instructor");
          }

    }
    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Add New Instructor</Modal.Title>    
            </Modal.Header>
            <Form className="create" onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3 w-100">
                        <Form.Label>Username: </Form.Label>
                        <Form.Control 
                        type="text"
                        onChange={(e)=> setUsername(e.target.value)}  //whenevr i write sth this funct is called
                        value={username} 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 w-100">
    
                        <Form.Label>Password: </Form.Label>
                        <Form.Control 
                        type="password"
                        onChange={(e)=> setPassword(e.target.value)}  //whenevr i write sth this funct is called
                        value={password} 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 w-100">
                        <Form.Label>Name: </Form.Label>
                        <Form.Control 
                        type="text"
                        onChange={(e)=> setName(e.target.value)}  //whenevr i write sth this funct is called
                        value={name} 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 w-100">
                        <Form.Label>Email: </Form.Label>
                        <Form.Control 
                        type="email"
                        onChange={(e)=> setEmail(e.target.value)}  //whenevr i write sth this funct is called
                        value={email} 
                        />
                    </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" onClick={props.show}> Add Instructor</Button>
                    </Modal.Footer>
                </Form>
    </div>


    )
}
export default InstructorForm;