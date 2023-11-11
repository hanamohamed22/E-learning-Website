import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import CourseList from "../components/CourseList";
import SearchIcon from "@mui/icons-material/Search";
import CourseCard from "../components/CourseCard";
import Filter from "../components/Filter";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import Pagination from "./Pagination";
import CardsCarousel from "../components/CardsCarousel";
import { Button } from "react-bootstrap";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ArrowForward from '@mui/icons-material/ArrowForward';



function Welcome(props) {
  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");
  const [isComponentVisible, setState] = useState(false);
  const [buttonid, setButtonId] = useState("");
  const countryToCurrency = require("country-to-currency");
  const cur = countryToCurrency[props.con.value];
  const [currency, setCurrency] = useState("EGP");

  const [filteredCourses, setFilteredCourses] = useState([]);

  const [subjects, setSubjects] = useState([]);
  const [allprices, setAllprices] = useState([]);
  const [subjectfiltered, setSubjectFiltered] = useState(false);
  const [ratingfiltered, setRatingFiltered] = useState(false);
  const [pricefiltered, setPriceFiltered] = useState(false);
  const [priceUsedInFilter, setPriceUsedInFilter] = useState("none");
  const [subjectUsedInFilter, setSubjectUsedInFilter] = useState("none");
  const [ratingUsedInFilter, setRatingUsedInFilter] = useState("none");
  const [price, setPrice] = useState(1);
  const[courses,setCourses]=useState([]);
  const [mostPopular,setMostPopular]=useState([])





  useEffect(() => {
 

      const fetchMostPopular = async () => {
        const response = await axios.get('/getMostPopular');
        if (response) {
          console.log(response.data)
          setMostPopular(response.data);
        }
    };


  fetchMostPopular();
 
}, []);
useEffect(()=>{
  
  const currenciesrate = async () => {
    const response = await axios.get(
        "https://v6.exchangerate-api.com/v6/6d56731204e6abe03c0a12b5/latest/EGP"
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
  }, [cur]);
  
  useEffect(()=>{
    const updatePromotion = async () => {
      await axios.patch('/updatePromotion');
  };
  updatePromotion();

  },[])

  //const keys = ["title", "subject", "instructor"];
  const handleSubmit = async (e) => {
    e.preventDefault();
    setQuery(input);
    window.location.href=`/home/${input}`  };

//   const Ratingfilter = async (e) => {
//     //ratingfiltered=true;
//     const data = await fetchallCourses();
//     setRatingFiltered(true);
//     //setRatingUsedInFilter(e.target.value);
//     setRatingUsedInFilter(e);
//     setCourses(data);
//   };

//   const Subjectfilter = async (e) => {
//     //subjectfiltered=true;
//     const data = await fetchallCourses();
//     setSubjectFiltered(true);
//     //setSubjectUsedInFilter(e.target.value);
//     setSubjectUsedInFilter(e);
//     setCourses(data);
//   };

//   const Pricefilter = async (e) => {
//     const data = await fetchallCourses();
//     setPriceFiltered(true);
//     //setPriceUsedInFilter(e.target.value);
//     setPriceUsedInFilter(e);
//     setCourses(data);
//   };

 

    return (<div className="welcome-page">

        <div className="welcome row">

            <div className="col-7 ">
                <h1 >MOVE</h1>
                <h2>BEYOND</h2>
                <h3>THE LIMITATION OF</h3>
                <h4>LEARNING</h4>
            </div>


            <div className="col-5 text-center "> 


            <form onSubmit={handleSubmit} className="wrapper w-75 align-middle mt-5">
              <button class="input-group-text bg-dark text-light" id="basic-addon1">
                {" "}
                <SearchIcon color="light" />
              </button>
              <input
                type="text"
                placeholder="search by subject ,title or instructor... "
                className="search"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                value={input}
                />
              
          </form>
          <Button variant="outline-primary p-3 w-75 my-3 align-middle" size="lg" style={{height:"70px"}}
                  onClick={()=>{window.location.href=`/home/${input}` }} >Discover Courses <ArrowForward fontSize="large"/></Button>
        </div>


        </div>
          
      
        
     
          
        {/* <div>
          <label>Filter By:</label>
          <Dropdown onSelect={Subjectfilter} className=" d-inline mx-4 w-25">
          <Dropdown.Toggle className="filters" >{subjectUsedInFilter==="none"?"subject" : subjectUsedInFilter}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="none">no filter</Dropdown.Item> {subjects.length>0?subjects.map((subject) => {return (<Dropdown.Item eventKey={subject}>{subject}</Dropdown.Item>)
                  }):"no subjects to show"}
            </Dropdown.Menu>
          </Dropdown>

            <Dropdown onSelect={Ratingfilter} className=" d-inline mx-4">
              <Dropdown.Toggle className="filters">
                {ratingUsedInFilter === "none"
                  ? "Rating"
                  : ratingUsedInFilter + "star"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="none">no filter</Dropdown.Item>{" "}
                {[1, 2, 3, 4, 5].map((rating) => {
                  return (
                    <Dropdown.Item eventKey={rating}>{rating}</Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown onSelect={Pricefilter} className=" d-inline mx-4 ">
              <Dropdown.Toggle className="filters">
                {priceUsedInFilter === "none" ? "price" : priceUsedInFilter}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="none">no filter</Dropdown.Item>{" "}
                {allprices.length > 0
                  ? allprices.map((courseprice) => {
                      return (
                        <Dropdown.Item eventKey={courseprice}>
                          {(courseprice * price).toFixed(0)}
                        </Dropdown.Item>
                      );
                    })
                  : "no subjects to show"}
              </Dropdown.Menu>
            </Dropdown>
          </div> */}
       

        {/* <div className=" p-4 grid">
            <div className="row">
            {filteredCourses.length > 0? filteredCourses.map((course,index) => {return(
                <Link key={index} to={`/course/${course._id}`} style={{ textDecoration: 'none'}} className=" col-lg-3 col-md-6 col-xs-12 p-2" >
                  <CourseCard key={course._id} passCourse={course} price={price} cur={currency}/></Link>
                );})
              : "no courses to show"}
           </div>
          </div> */}
          <div className="cardsCarousel my-5  ">
        <h1 className=" text-dark mb-3">Our Top Courses</h1>
          <CardsCarousel  courses={mostPopular} price={price} currency={currency} n={4}/>
        </div>
    

        {/* <Pagination items={filteredCourses} price={price} currency={currency}/> */}
    
        
        </div>
        
        
    
  );
}

export default Welcome;
