
//import CountrySelect from "react-bootstrap-country-select";
import "react-country-dropdown/dist/index.css";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import axios from "axios";
import {React,useState,useMemo,useEffect} from "react";
import { Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import logo from '../images/logo.png'

const TraineeNavbar = (props) => {
    const [value, setValue] = useState('')
    const { logout } = useLogout()
    const { user } = useAuthContext()
   // console.log(user)
   // const {userId}=props.userId
const [userId,setUserId]=useState('')
  const options = useMemo(() => countryList().getData(), [])

  const changeHandler = value => {
    setValue(value)
    props.country(value)
    
  }
  // /console.log(props.userId)
  //console.log(userId)
 // console.log(user)
  const [student, setStudent] = useState({});//ahsan neb2a ne pass el instructor kolo fel props
   const handleClick = () => {
    logout()
    //setUserId("")
  }
  useEffect(() => {

   
    const fetchTrainee = async () => {
      const response = await axios.get(`/viewTrainee?id=${user.user._id}`);
      if (response) {
          setUserId(user.user._id)
          setStudent(response.data.trainee);
          console.log(response.data.trainee);
          if(!response.data.trainee){
            const r = await axios.get(`/viewCorpTrainee?id=${user.user._id}`);
      if (r) {
          setUserId(user.user._id)
          setStudent(r.data.corptrainee);
          console.log(r.data.corptrainee)
      }
      }
     
      }
  };
 if(user){
  fetchTrainee();
 }

  },[user]);

  return (
    <nav className="navbar navbar-expand-lg bg-light ">      
    <div className="container-fluid">
    <Link className="text-decoration-none navbar-brand" onClick={()=>{if (user){
         
            window.location.href=`/`
          }
        }}><img src={logo} width="100%"></img></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav d-flex align-items-center">
            <li className="nav-item  ">
            <a className="nav-link active " aria-current="page" href={`/myLearning`}>My Learning</a>
            </li>

            { student && user.message=="individualTrainee"&&
            <li className="nav-item ">
            <a className="nav-link " href={`/traineeWallet`}>My Wallet</a>
            </li>}
            
            <li>
            <Select className=" countrySelect " placeholder="country..." options={options} value={value} onChange={changeHandler} />
            </li>

        </ul>
        { student && user.message=="individualTrainee"?(
        <ul className="navbar-nav d-flex ms-auto me-2 align-items-center ">
          <li className="nav-item  ">
            <a className="nav-link active " aria-current="page">{student.firstname} {student.lastname}</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" style={{width:"min-content"}} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img className="instructor-img    " style={{width:"3rem"}}  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"></img>
            </a>
            <ul className="dropdown-menu dropdown-menu-end ">
                <li><a className="dropdown-item" href={`/editTrainee/id=${student._id}`}>edit profile</a></li>
                <li><a className="dropdown-item" href={`/ReportsPage/id=${user.user._id}`}>Reports</a></li>
                <li><a className="dropdown-item" href="/" onClick={handleClick}>Log out</a></li>
            </ul>
          </li>

        </ul>):( student && user.message==="corporateTrainee"? (
        <ul className="navbar-nav d-flex ms-auto me-2 align-items-center ">
          <li className="nav-item  ">
            <a className="nav-link active " aria-current="page">{student.firstname} {student.lastname}</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" style={{width:"min-content"}} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img className="instructor-img    " style={{width:"3rem"}}  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"></img>
            </a>
            <ul className="dropdown-menu dropdown-menu-end ">
                <li><a className="dropdown-item" href={`/editCorpTrainee/${student._id}`}>edit profile</a></li>
                <li><a className="dropdown-item" href={`/ReportsPage/id=${user.user._id}`}>My Reports</a></li>
                <li><a className="dropdown-item" href="/"  onClick={handleClick}>Log out</a></li>
            </ul>
          </li>

        </ul>):<></>)}
        
        {/* {(user && student)  && (
            <div>
              <span>{student.email}</span>
            </div>
          )} */}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        

        </div>

    </div>
</nav>
  );
};
export default TraineeNavbar;
