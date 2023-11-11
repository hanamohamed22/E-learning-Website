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
 import CorporateTraineeForm from "../components/CorporateTraineeForm";
 import Table from 'react-bootstrap/Table';





function AdminViewStudents() {
  

  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");
  const [corpTrainees, setCorpTrainees] = useState([]);
  const [trainees, setTrainees] = useState([]);

   
    
    useEffect(() => {

        const fetchTrainees = async () => {
            const response = await axios.get(`/viewTrainees?q=${query.toLocaleLowerCase()}`);
            if (response) {
                setTrainees(response.data); }
        };
        const fetchCorpTrainees = async () => {
            const response = await axios.get(`/viewCorpTrainees?q=${query.toLocaleLowerCase()}`);
            if (response) {
                setCorpTrainees(response.data); }
        };
    
        fetchTrainees();
        fetchCorpTrainees();
  }, [query]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setQuery(input);
  };

  const[showAddCorpForm,setShowAddCorpForm]=useState(false)

  const handleAddCorp=async(e)=>{
    setShowAddCorpForm(!showAddCorpForm);
    
  }
 

    return (
    
    <div className="container w-75">
        
        

        <div className="row my-3"> 
        <div className="col-8 ">
          <form onSubmit={handleSubmit} className="wrapper w-100 me-4 ">
          <button className="searchButton" type="submit"> <SearchIcon color="disabled"/></button>
              <input
              type="text"
              placeholder="search by username or name... "
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
          <Button onClick={handleAddCorp} ariant="primary" className="w-100" style={{height:"50px"}} >Add New Corporate Trainee</Button>           
        </div> 
        
        </div>

        {/* <div >
            <p> {corpTrainees.length} Corporate Trainees  </p> 
            <div className="instructorInstructorCards ">
                {corpTrainees.length>0? corpTrainees.map((corp)=>{return(
                <div className=" bg-white  m-2 p-3 px-5">
                <h5 className="fw-bold">{corp.username}</h5>
                <p className="p-2">{corp.email}</p>
                </div>)}):"no Corporate Trainees to show"}
            </div>
        </div> */}
        <Table className="w-75">
          <thead>
          <p style={{paddingBottom:"20px"}}> {corpTrainees.length} Corporate Trainees  </p>
          <tr>
              <th style={{paddingLeft:"30px"}}>Name</th>
              <th>Email</th>
          </tr>
          </thead>
          <tbody>
          {corpTrainees.length>0&&corpTrainees.map(corp=>{ return (

                  <tr>
                      <td style={{paddingBottom:"30px",paddingLeft:"30px"}}>{corp.username}</td>                            
                      <td>{corp.email}</td>
                  </tr>

              )})}
          </tbody>
        </Table>

        <Table className="w-75" >
          <thead>
          <p style={{paddingBottom:"20px",paddingTop:"30px"}}> {trainees.length} Individual Trainees  </p> 
          <tr>
              <th style={{paddingLeft:"30px"}}>Name</th>
              <th>Email</th>
          </tr>
          </thead>
          <tbody>
          {trainees.length>0&&trainees.map(t=>{ return (

                  <tr >
                      <td style={{paddingBottom:"30px",paddingLeft:"30px"}}>{t.firstname} {t.lastname}</td>                            
                      <td>{t.email}</td>
                  </tr>

              )})}
          </tbody>
        </Table>

          {/* <div >
            <p> {trainees.length} Individual Trainees  </p> 
            <div className="instructorInstructorCards ">
                {trainees.length>0? trainees.map((t)=>{return(
                <div className=" bg-white  m-2 p-3 px-5">
                <h5 className="fw-bold">{t.firstname} {t.lastname}</h5>
                <p className="p-2">{t.email}</p>
                </div>)}):"no Individual Trainees to show"}
            </div>
        </div> */}

        <Modal show={showAddCorpForm} onHide={handleAddCorp}>
        <CorporateTraineeForm show={handleAddCorp}/>
        </Modal>
      </div>
    
  );
}

export default AdminViewStudents;
