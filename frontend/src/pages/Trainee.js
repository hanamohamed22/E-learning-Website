
import { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import CourseList from "../components/CourseList";
import SearchIcon from '@mui/icons-material/Search';
import CourseCard from "../components/CourseCard";
import Filter from "../components/Filter";
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import Pagination from "./Pagination";
import Button from 'react-bootstrap/Button';
import { useAuthContext } from '../hooks/useAuthContext'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function Trainee(props) {
  //const id='638cbd05b6e568db74b37511';\
  const [id,setId]=useState('')
  const { user } = useAuthContext();
 console.log(user)
 
  //const id=user.individualuser._id
  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");
  const [isComponentVisible, setState]=useState(false);
  const [buttonid, setButtonId]=useState('');
  const countryToCurrency = require("country-to-currency");
  const cur = countryToCurrency[props.con.value];
  const [currency, setCurrency] = useState("EGP");

  const [filteredCourses, setFilteredCourses] = useState([]);
  
  const [subjects,setSubjects]=useState([]);
  const [allprices,setAllprices]=useState([]);
  const[subjectfiltered,setSubjectFiltered]=useState(false);
  const[ratingfiltered,setRatingFiltered]=useState(false);
  const[pricefiltered,setPriceFiltered]=useState(false);
  const[priceUsedInFilter,setPriceUsedInFilter]=useState("none");
  const[subjectUsedInFilter,setSubjectUsedInFilter]=useState("none");
  const[ratingUsedInFilter,setRatingUsedInFilter]=useState("none");
  const [price, setPrice] = useState(1);
  const[courses,setCourses]=useState([]);

const getSubjects =async ()=>{
    const response=await axios.get('/findsubjects');
    let unique = [...new Set(response.data.map((x)=>{return (x.toLowerCase())}))];
    
    if(response){
        setSubjects(unique)
        }
    }
    const getPrices =async ()=>{
        const response=await axios.get('/findprices');
        if(response){
            setAllprices(response.data)
        }
    }
    const fetchallCourses = async () => {
        const response = await axios.get('/courses');
        if (response) {
        return response.data; 
        }
    };

    useEffect(() => {
        getSubjects();
        getPrices();

        const fetchCourses = async () => {
            const response = await axios.get(`/search?q=${query.toLocaleLowerCase()}`);
            if (response) {
                setFilteredCourses(response.data); //awl ma yebda2 dol el hyb2o displayed 
            }
        };


    fetchCourses();
   
  }, [query, price]);
 
  
  useEffect(()=>{
    // console.log(pricefiltered);
    // console.log(priceUsedInFilter);
    // console.log(subjectfiltered);
    // console.log(subjectUsedInFilter);
    // console.log(ratingfiltered);
    // console.log(ratingUsedInFilter);
    if(user){
      setId(user.user._id)
      console.log(id)
    }
    console.log(price +"..................")
    setFilteredCourses(courses.filter((course)=>{
      if(course.subject.toLowerCase()===subjectUsedInFilter || subjectUsedInFilter==="none"){
        if(course.price+""===priceUsedInFilter || priceUsedInFilter==="none"){
          if(Math.round(course.avgRating)+""===ratingUsedInFilter || ratingUsedInFilter==="none"){
                        
            return course;
          }else{
            return null;
          }
        }
        else{
          return null;
        }
        }else{
          return null;}
            
        }))
    
   

  },[pricefiltered,subjectfiltered,ratingfiltered,subjectUsedInFilter,ratingUsedInFilter,priceUsedInFilter,courses,user])
  useEffect(()=>{
    
    const currenciesrate = async () => {
      const response = await axios.get(
          "https://v6.exchangerate-api.com/v6/a75d504cc0c97663c4ce59a5/latest/EGP"
      );

      if (response) {
          if (cur) {
          setCurrency(cur);
          Object.keys(response.data.conversion_rates).forEach((key) => {
              if (key === cur) {
              setPrice(response.data.conversion_rates[key]);
              }
          });
          }
      }
      };
      currenciesrate();

  },[cur]);
  //const keys = ["title", "subject", "instructor"];
  const handleSubmit = async (e) => {
    e.preventDefault();
    setQuery(input);
    console.log(query);
  };
  const Ratingfilter=async (e)=>{
    //ratingfiltered=true;
    const data= await fetchallCourses();
    setRatingFiltered(true);
    //setRatingUsedInFilter(e.target.value);
    setRatingUsedInFilter(e);
    setCourses(data);
    }

    const Subjectfilter=async (e)=>{
      //subjectfiltered=true;
      const data= await fetchallCourses();
      setSubjectFiltered(true);
      //setSubjectUsedInFilter(e.target.value);
      setSubjectUsedInFilter(e);
      setCourses(data);
      }
  
  const Pricefilter=async(e)=>{
    const data= await fetchallCourses();
    setPriceFiltered(true)
    //setPriceUsedInFilter(e.target.value);
    setPriceUsedInFilter(e);
    setCourses(data);
    }

  //   const  toggleComponent=(id)=>  { 
  //     setState(true)
  //     console.log(isComponentVisible)
  //      setButtonId(id)
      
  // } 
  //  const handleClick=(Event)=> {
  //    const id = Event.target.id;
  //    console.log(id);
  //    toggleComponent(id);
  //  }
 



    return (<div>
          
      
        
      <div className="container ">
        <div className="pt-4">
        <form onSubmit={handleSubmit} className="wrapper">
              <button className="searchButton" type="submit"> <SearchIcon color="disabled"/></button>
                  <input
              type="text"
              placeholder="search by subject ,title or instructor... "
              className="search"
              onChange={(e) => {
                  setInput(e.target.value);
              }}
              value={input}
              />
            <button className="clear-icon" onClick={()=>{setQuery(""); setInput("")}} > <ClearIcon color="disabled"/></button>   
            
        </form>
        {/* <Button className="edit-profile-btn" href={`/editTrainee/${id}`}>
          View my Profile
        </Button> */}


        <label>Filter By:</label>
        <Dropdown onSelect={Subjectfilter} className=" d-inline mx-4">
        <Dropdown.Toggle className="filters" >{subjectUsedInFilter==="none"?"subject" : subjectUsedInFilter}</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="none">no filter</Dropdown.Item> {subjects.length>0?subjects.map((subject) => {return (<Dropdown.Item eventKey={subject}>{subject}</Dropdown.Item>)
                }):"no subjects to show"}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown  onSelect={Ratingfilter} className=" d-inline mx-4" >
        <Dropdown.Toggle className="filters" >{ratingUsedInFilter==="none"? "Rating" : ratingUsedInFilter+"star"}</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="none">no filter</Dropdown.Item> {[1,2,3,4,5].map((rating) => {return (<Dropdown.Item eventKey={rating}>{rating}</Dropdown.Item>)
                })}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown onSelect={Pricefilter} className=" d-inline mx-4 ">
        <Dropdown.Toggle  className="filters">{priceUsedInFilter==="none"? "price" :priceUsedInFilter}</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="none">no filter</Dropdown.Item> {allprices.length>0?allprices.map((courseprice) => {return (<Dropdown.Item eventKey={courseprice}>{(courseprice*price).toFixed(0)}</Dropdown.Item>)}):"no subjects to show"}
          </Dropdown.Menu>
        </Dropdown>
        {/* <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={value1}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
      />
      </Box> */}
        </div>

          {/* <div className=" p-4 grid">
            <div className="row">
            {filteredCourses.length > 0? filteredCourses.map((course,index) => {return(
                <Link key={index} to={`/course/${course._id}`} style={{ textDecoration: 'none'}} className=" col-lg-3 col-md-6 col-xs-12 p-2" >
                  <CourseCard key={course._id} passCourse={course} price={price} cur={currency}/></Link>
                );})
              : "no courses to show"}
           </div>
          </div> */}

        <Pagination items={filteredCourses} price={price} cur={currency}/>
          
        
        </div>
      
      </div>
    
  );
}

export default Trainee;
