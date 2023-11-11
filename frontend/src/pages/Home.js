import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import CourseList from "../components/CourseList";
import SearchIcon from "@mui/icons-material/Search";
import CourseCard from "../components/CourseCard";
import Filter from "../components/Filter";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate, useParams } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import Pagination from "./Pagination";
import CardsCarousel from "../components/CardsCarousel";



function Home(props) {

  var { q } = useParams();
  q= !q? "" : q;

  const [query, setQuery] = useState(q);
  const [input, setInput] = useState(q);
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


  const getSubjects = async () => {
    const response=await axios.get('/findsubjects');
      console.log(response.data);
      
      if(response){
          setSubjects(response.data)
          }
  };
  const getPrices = async () => {
    const response = await axios.get("/findprices");
    if (response) {
      setAllprices(response.data);
    }
  };
  const fetchallCourses = async () => {
    const response = await axios.get("/courses");
    if (response) {
      return response.data;
    }
  };

  useEffect(() => {
    getSubjects();
    getPrices();

    console.log("queryyyyy"+query)
    const fetchCourses = async () => {
      const response = await axios.get(
        `/search?q=${query.toLocaleLowerCase()}`
      );
      if (response) {
        setFilteredCourses(response.data);
      }
    };
      const fetchMostPopular = async () => {
        const response = await axios.get('/getMostPopular');
        if (response) {
          console.log(response.data)
          setMostPopular(response.data);
        }
    };


  fetchCourses();
  //fetchMostPopular();
 
}, [query, price]);
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
  
  // useEffect(()=>{
  //   const updatePromotion = async () => {
  //     await axios.patch('/updatePromotion');
  // };
  // updatePromotion();

  // },[])

  useEffect(() => {
    // console.log(pricefiltered);
    // console.log(priceUsedInFilter);
    // console.log(subjectfiltered);
    // console.log(subjectUsedInFilter);
    // console.log(ratingfiltered);
    // console.log(ratingUsedInFilter);
    console.log(price + "..................");
    setFilteredCourses(
      courses.filter((course) => {
        if (
          course.subject === subjectUsedInFilter ||
          subjectUsedInFilter === "none"
        ) {
          if (
            course.price + "" === priceUsedInFilter ||
            priceUsedInFilter === "none"
          ) {
            if (
              Math.round(course.avgRating) + "" === ratingUsedInFilter ||
              ratingUsedInFilter === "none"
            ) {
              return course;
            } else {
              return null;
            }
          } else {
            return null;
          }
        } else {
          return null;
        }
      })
    );
  }, [
    pricefiltered,
    subjectfiltered,
    ratingfiltered,
    subjectUsedInFilter,
    ratingUsedInFilter,
    priceUsedInFilter,
    courses,
  ]);

  //const keys = ["title", "subject", "instructor"];
  const handleSubmit = async (e) => {
    e.preventDefault();
    setQuery(input);
    console.log(query);
  };
  const Ratingfilter = async (e) => {
    //ratingfiltered=true;
    const data = await fetchallCourses();
    setRatingFiltered(true);
    //setRatingUsedInFilter(e.target.value);
    setRatingUsedInFilter(e);
    setCourses(data);
  };

  const Subjectfilter = async (e) => {
    //subjectfiltered=true;
    console.log(e);
    const data = await fetchallCourses();
    setSubjectFiltered(true);
    //setSubjectUsedInFilter(e.target.value);
    setSubjectUsedInFilter(e);
    setCourses(data);
  };

  const Pricefilter = async (e) => {
    const data = await fetchallCourses();
    setPriceFiltered(true);
    //setPriceUsedInFilter(e.target.value);
    setPriceUsedInFilter(e);
    setCourses(data);
  };

 

    return (<div>
          
      
        
      <div className="cardsContainer  ">
        <div className="d-flex py-5">
          <div className="w-50 px-3"> 
            <form onSubmit={handleSubmit} className="wrapper w-100">
              <button className="searchButton" type="submit">
                {" "}
                <SearchIcon color="disabled" />
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
              <button className="clear-icon" onClick={()=>{setQuery(""); setInput("")}} > <ClearIcon color="disabled"/></button>   
              
          </form>
        </div>
        <div>
          <label>Filter By:</label>
          <Dropdown onSelect={Subjectfilter} className=" d-inline mx-4 w-25">
          <Dropdown.Toggle className="filters" >{subjectUsedInFilter==="none"?"subject" : subjectUsedInFilter}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="none">no filter</Dropdown.Item> {subjects.length>0?subjects.map((subject) => {return (<Dropdown.Item eventKey={subject.subject}>{subject.subject}</Dropdown.Item>)
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
          </div>
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
          {/* <div className="cardsCarousel">
        <h2 >Most Popular</h2>
          <CardsCarousel courses={mostPopular} price={price} currency={currency} n={4}/>
        </div> */}
    

        <Pagination items={filteredCourses} price={price} currency={currency}/>
        </div>
        
        </div>
        
        
    
  );
}

export default Home;
