
import { useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import Modal from 'react-bootstrap/Modal';

    const AdminForm=(props)=>{
    const [username, setUsername]= useState(''); //title
    const [password, setPassword]= useState('') ;//subt
    const [mssg,setMssg]=useState("");
   
    //const [error, setError]= useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()

        //const admin={username,password}
        try {
            await axios.post("/addadmin", {
              username: username,
              password: password,
            });
            setMssg("Admin added successfully");
            setUsername("");
            setPassword("")
          } catch (err) {
            alert("Couldn't add admin");
          }
    }
        return (
    <Form className="create" onSubmit={handleSubmit}>
      
        <Modal.Header closeButton>
          <Modal.Title>Add New Admin</Modal.Title>    
        </Modal.Header>
        <Modal.Body>
          <p className="text-success">{mssg}</p>
        <Form.Label>Username:</Form.Label>
        <Form.Control 
        placeholder="username"
        type="text"
        id="username"
        onChange={(e)=> setUsername(e.target.value)}  //whenevr i write sth this funct is called
        value={username} 
        />
        <Form.Label>Password:</Form.Label>
        <Form.Control 
        placeholder="set password"
        type="password"
        onChange={(e)=> setPassword(e.target.value)}  //whenevr i write sth this funct is called
        value={password} 
        />
        
        </Modal.Body>
        <Modal.Footer>
        <Button type="submit" > Add Admin</Button>
        </Modal.Footer>

    </Form>

    )
}
export default AdminForm;