

import axios from "axios";
import {React,useState,useMemo,useEffect} from "react";
import LanguageIcon from '@mui/icons-material/Language';

//import CountrySelect from "react-bootstrap-country-select";
import "react-country-dropdown/dist/index.css";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import logo from '../images/logo.png'
import { Link } from "react-router-dom";
const InstructorNavbar = (props) => {
  const [value, setValue] = useState('');
  const options = useMemo(() => countryList().getData(), []);
  const { user } = useAuthContext()
  const [userId,setUserId]=useState('')
  //const userId=props.userId;
  const { logout } = useLogout()
  const [instructor, setInstructor] = useState(null);//ahsan neb2a ne pass el instructor kolo fel props
  const handleClick = () => {
      logout()
    }
    const changeHandler = value => {
      setValue(value)
      props.country(value)
    }
  useEffect(() => {

    const getInstructor = async () => {
      const response = await axios.get(`/viewInstructor/?id=${user.user._id}`);
      if (response) {
        console.log(response.data)
        setInstructor(response.data.instructor);
        setUserId(user.user._id)
      }
    };
    
      if (user){
        getInstructor();
      }

 },[user]);

  return (
    <nav className="navbar navbar-expand-lg bg-light ">      
      <div className="container-fluid">
          <Link className="text-decoration-none navbar-brand" onClick={()=>{if (user){window.location.href=`/`}
        }}><img src={logo} width="100%"></img></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav d-flex align-items-center">
              <li className="nav-item  ">
              <a className="nav-link active " aria-current="page" href="/2">My Courses</a>
              </li>
              <li className="nav-item ">
              <a className="nav-link " href='/instructorwallet'>Wallet</a>
              </li>
              {/* <li className="nav-item ">
              <a className="nav-link" href="#">Pricing</a>
              </li> */}
              <li>
              <Select className="countrySelect " placeholder="country..."  options={options} value={value} onChange={changeHandler} />
              </li>

          </ul>
          { (instructor!==null && user.message==="instructor") &&(
          <ul className="navbar-nav d-flex ms-auto me-2 align-items-center ">
            <li className="nav-item  ">
              <a className="nav-link active " aria-current="page"href={`/InstructorProfile/${userId}`}>{instructor.name}</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" style={{width:"min-content"}} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img className="instructor-img    " style={{width:"3rem"}}  src={instructor.img? instructor.img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"}></img>
              </a>
              <ul className="dropdown-menu dropdown-menu-end ">
              <li><a className="dropdown-item" href={`/editInstructor/id=${userId}`}>Edit Profile</a></li>
                  {/* <li><a className="dropdown-item" href="#">My Wallet</a></li> */}
                  <li><a className="dropdown-item" href={`/ReportsPage/id=${user.user._id}`}>My Reports</a></li>
                  <li><a className="dropdown-item" href="/" onClick={handleClick}>Log out</a></li>
              </ul>
            </li>
            </ul>
         ) } 
       

         
          {/* {(user && instructor!==null && user.message==="instructor") && (
            <div>
              <span>{instructor.email}</span>
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
export default InstructorNavbar;
