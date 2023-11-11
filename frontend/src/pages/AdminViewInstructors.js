import { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import InstructorCard from "../components/InstructorCard";
 import Modal from 'react-bootstrap/Modal';
 import Button from 'react-bootstrap/Button';
 import InstructorForm from "../components/InstructorForm";
 import ClearIcon from '@mui/icons-material/Clear';
 import Table from "react-bootstrap/esm/Table";
 import profileImg from "../images/profile-img.jpeg";




function AdminViewInstructors(props) {
  
  const imgUrl="https://fullscale.io/wp-content/uploads/2022/04/hiring-javascript-developers.png";
  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");
  const [instructors, setInstructors] = useState([]);
  
   
    
    useEffect(() => {

        const fetchInstructors = async () => {
            const response = await axios.get(`/instructors?q=${query.toLocaleLowerCase()}`);
            if (response) {
                setInstructors(response.data); }
        };
    
    fetchInstructors();
  }, [query]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setQuery(input);
  };

  const[showAddInstructorForm,setShowAddInstructorFrom]=useState(false)

  const handleAddInstructor=async(e)=>{
    setShowAddInstructorFrom(!showAddInstructorForm);
    
  }
 

    return (
    
    <div className="container w-75">
        
        

        <div className="row my-3"> 
        <div className="col-8 ">
          <form onSubmit={handleSubmit} className="wrapper w-100 me-4 ">
          <button className="searchButton" type="submit"> <SearchIcon color="disabled"/></button>
              <input
              type="text"
              placeholder="search by instructor name or username... "
              className="search"
              onChange={(e) => {
                  setInput(e.target.value);
              }}
              value={input}
              />
            <button className="clear-icon" onClick={()=>{setQuery(""); setInput("")}} > <ClearIcon color="disabled"/></button>   
            
            </form>
        </div>

        <div className="col-4 px-2">
          <Button onClick={handleAddInstructor} ariant="primary" className="w-100" style={{height:"50px"}} >Create New Instructor</Button>           
        </div> 
        
        </div>
        <Table className="mx-auto">
          <thead>
          <p style={{paddingBottom:"20px"}}> {instructors.length} Instructors  </p>
          <tr>
              <th style={{paddingLeft:"35px"}}>Name</th>
              <th>Email</th>
          </tr>
          </thead>
          <tbody>
          {instructors.length>0&&instructors.map(instruc=>{ return (

                  <tr>
                      <td className="w-50" >
                        <img className="instructor-img" src={instruc.img? instruc.img : profileImg} alt="instructor image here"/>
                        <Link to={`/instructorProfile/${instruc._id}`}  className="text-dark">{instruc.name}</Link>
                      </td>                            
                      <td className="align-middle">{instruc.email}</td>
                  </tr>

              )})}
          </tbody>
        </Table>

          <Modal show={showAddInstructorForm} onHide={handleAddInstructor}>
            <InstructorForm show={handleAddInstructor}/>
          </Modal>
      </div>
    
  );
}

export default AdminViewInstructors;
