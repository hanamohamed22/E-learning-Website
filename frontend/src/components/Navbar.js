
//import {Link} from 'react-router-dom';
import {React,useState,useMemo} from "react";

//import CountrySelect from "react-bootstrap-country-select";
import "react-country-dropdown/dist/index.css";
import { Link } from "react-router-dom";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import logo from '../images/logo.png'

import Button from 'react-bootstrap/Button';


const Navbar = (props) => {
    const [value, setValue] = useState('')
    const { logout } = useLogout()
    const { user } = useAuthContext()

  const options = useMemo(() => countryList().getData(), [])

  // const handleClick = () => {
  //   logout()
  // }

  const changeHandler = value => {
    setValue(value)
    props.country(value)
  }
  const handleClick = () => {
    logout()
    //setUserId("")
  }
//     const [ country, setCountry ] = useState("");
    
//   const handleChange = (value) => {
//     setCountry(value)
//       console.log(value)
//       /* returns the details on selected country as an object
//           {
//             name: "United States of America",
//             code: "US",
//             capital: "Washington, D.C.",
//             region: "Americas",
//             latlng: [38, -97]
//           }
//       */
//     }
  return (
      <nav className="navbar">
        <a className="text-decoration-none navbar-brand" href="/" >
        <img src={logo} width="100%"></img></a>
      
      {/* <div className='container'>
                <Link to="/">
                    <h1>Courses</h1>
                </Link>
            </div> */}
        <Select style={{innerWidth:"500px"}} className="countrySelect" placeholder="country..." options={options} value={value} onChange={changeHandler} />

        {/* <CountrySelect size="sm" value={country} onChange={(e)=>handleChange(e.target.value)} /> */}
        {/* <ReactCountryDropdown onSelect={handleSelect} countryCode='IN' /> */}
        {/* {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )} */}
          
         
          {!user? (
            <div>
              <Button variant="" size="lg" href="/login">Login</Button>
              <Button variant="outline-reddy" size="lg" className="mx-2" href="/signup">Signup</Button>
            </div>
          ):<> <Button variant="outline-secondary" size="lg" href="/" onClick={handleClick}>Logout</Button></>}
      
    </nav>
    
  );
};
export default Navbar;
