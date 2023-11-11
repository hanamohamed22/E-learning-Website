import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import CourseList from "../components/CourseList";
import SearchIcon from "@mui/icons-material/Search";
import CourseCard from "../components/CourseCard";
//import Filter from "../components/Filter";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useAuthContext } from "../hooks/useAuthContext";
import{useNavigate} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Pagination from "./Pagination";
import ClearIcon from "@mui/icons-material/Clear";




function CorporateTrainee(props) {
  //const id='635a4b135adb491ddf7ce66f';
  const {user}=useAuthContext();
  const corporate=1;
  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");
  const [isComponentVisible, setState] = useState(false);
  const [buttonid, setButtonId] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();


  
  const [filteredCourses, setFilteredCourses] = useState([]);

  const [subjects, setSubjects] = useState([]);
 
  const [subjectfiltered, setSubjectFiltered] = useState(false);
  const [ratingfiltered, setRatingFiltered] = useState(false);
  const [showfirstLogin, setShowfirstLogin] = useState(false);

  const [subjectUsedInFilter, setSubjectUsedInFilter] = useState("none");
  const [ratingUsedInFilter, setRatingUsedInFilter] = useState("none");
 
  const [courses, setCourses] = useState([]);

  const getSubjects = async () => {
    const response = await axios.get("/findsubjects");
    let unique = [
      ...new Set(
        response.data.map((x) => {
          return x.toLowerCase();
        })
      ),
    ];

    if (response) {
      setSubjects(unique);
    }
  };
  
  const fetchallCourses = async () => {
    const response = await axios.get("/courses");
    if (response) {
      return response.data;
    }
  };
  useEffect(() => {
    const fetchCorpTrainee = async () => {
      const response = await axios.get(`/viewCorpTrainee?id=${id}`);
      if (response) {
          if(!response.data.corptrainee.flag)
          setShowfirstLogin(true);
      }
      
  };
  fetchCorpTrainee();
   if (user){
    setId(user.user._id)
   }
  },[user,id])
  useEffect(() => {
    getSubjects();


    const fetchCourses = async () => {
      const response = await axios.get(
        `/search?q=${query.toLocaleLowerCase()}`
      );
      if (response) {
        setFilteredCourses(response.data); //awl ma yebda2 dol el hyb2o displayed
      }
    };
    fetchCourses();
   
  }, [query]);

  useEffect(() => {
    // console.log(pricefiltered);
    // console.log(priceUsedInFilter);
    // console.log(subjectfiltered);
    // console.log(subjectUsedInFilter);
    // console.log(ratingfiltered);
    // console.log(ratingUsedInFilter);

    setFilteredCourses(
      courses.filter((course) => {
        if (
          course.subject.toLowerCase() === subjectUsedInFilter ||
          subjectUsedInFilter === "none"
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
      })
    );
  }, [
    
    subjectfiltered,
    ratingfiltered,
    subjectUsedInFilter,
    ratingUsedInFilter,
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
    const data = await fetchallCourses();
    setSubjectFiltered(true);
    //setSubjectUsedInFilter(e.target.value);
    setSubjectUsedInFilter(e);
    setCourses(data);
  };

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

  return (
    <div>
      {/* <div className="filters">
            <div className="row">
              <div className="col md-1">
                // <Filter click={Pricefilter} list={allprices.length>0?allprices.map((courseprice) => {return(courseprice*price).toFixed(0)}):[]}/> 
              <label>Filter By:</label>
             <select name="subject " onChange={Subjectfilter}><option value="none">no filter</option> {subjects.length>0?subjects.map((subject) => {return (<option value={subject}>{subject}</option>)
              }):"no subjects to show"}</select>
              </div> 
              <div className="col md-1"><label>Filter By Rating: </label><br/><select onChange={Ratingfilter}><option value="none">no filter</option><option value="1">1</option><option value="2">2</option>
              <option value="3">3</option><option value="4">4</option><option value="5">5</option></select></div>
              <div className="col md-1"> <label>Filter By Price: </label><br/><select onChange={Pricefilter}><option value="none">no filter</option> {allprices.length>0?allprices.map((courseprice) => {return (<option value={courseprice}>{(courseprice*price).toFixed(0)}</option>)
              }):"no subjects to show"}</select></div>
            </div>
        </div> */}

      <div className="container ">
        <div className="pt-4">
          <form onSubmit={handleSubmit} className="wrapper me-3">
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
          
          

          <label>Filter By:</label>
          <Dropdown onSelect={Subjectfilter} className=" d-inline mx-5">
            <Dropdown.Toggle className="filters">
              {subjectUsedInFilter === "none" ? "subject" : subjectUsedInFilter}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="none">no filter</Dropdown.Item>{" "}
              {subjects.length > 0
                ? subjects.map((subject) => {
                    return (
                      <Dropdown.Item eventKey={subject}>
                        {subject}
                      </Dropdown.Item>
                    );
                  })
                : "no subjects to show"}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown onSelect={Ratingfilter} className=" d-inline mx-5">
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
        </div >
        <div className="content">
        <Pagination items={filteredCourses} />
        </div>
      </div>
      <Modal show={showfirstLogin}>
        <Modal.Title><label className='text-primary'>Welcome To CCC Courses</label></Modal.Title>
            <Modal.Body>
               <p>you will be directed to your profile page to edit your personal info and password</p>
                    
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary"  onClick={()=>{navigate(`/editCorpTrainee/${user.user._id}`)}}  > Okay </Button>
            </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CorporateTrainee;
