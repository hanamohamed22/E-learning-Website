import { useEffect, useState } from "react";
import axios from "axios";
import CoursesForm from "../components/CoursesForm";
import Card from "react-bootstrap/Card";
import InstructorCourseCard from "../components/InstructorCourseCard";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Modal from "react-bootstrap/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import Contract from "../components/Contract";
import ListGroup from "react-bootstrap/ListGroup";
import ButtonGroup from "@mui/material/ButtonGroup";
import StarIcon from "@mui/icons-material/Star";
import { DynamicStar } from "react-dynamic-star";
import { useAuthContext } from "../hooks/useAuthContext";
import CourseCard from"../components/CourseCard";

const Instructor = (props) => {
  //contract
  const [showContract, setShowContract] = useState(false);

  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");
  const countryToCurrency = require("country-to-currency");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [publishedCourses, setPublishedCourses]=useState([]);
  const [unpublishedCourses, setUnpublishedCourses]=useState([]);


  const cur = countryToCurrency[props.con.value];
  const [currency, setCurrency] = useState("EGP");
  //const idTemp = "635a48148964b6e199512fe3"; //id mo2akat
  const [subjects, setSubjects] = useState([]);
  const [allprices, setAllprices] = useState([]);
  const [subjectfiltered, setSubjectFiltered] = useState(false);

  const [myInstructor, setMyInstructor] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [pricefiltered, setPriceFiltered] = useState(false);
  const [priceUsedInFilter, setPriceUsedInFilter] = useState("none");
  const [subjectUsedInFilter, setSubjectUsedInFilter] = useState("none");

  const [price, setPrice] = useState(1);
  const [courses, setCourses] = useState([]);
  const {user}=useAuthContext();
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
    const response = await axios.get(
      `/instructorCourses/?id=${user.user._id}&q=${query}`
    );
    if (response) {
      return response.data; //awl ma yebda2 dol el hyb2o displayed
    }
  };

  //useEffect fires a function once the component is rendered
  // useEffect(()=>{
  //   const updatePromotion = async () => {
  //     await axios.patch('/updatePromotion');
  // };
  // updatePromotion();

  // },[])
  useEffect(() => {
    getSubjects();
    getPrices();
    const fetchCourses = async () => {
      const response = await axios.get(
        `/instructorCourses/?id=${user.user._id}&q=${query}`
      );
      if (response) {
        setFilteredCourses(response.data);
        setCourses(response.data); //awl ma yebda2 dol el hyb2o displayed
      }
    };
    const viewInstructor = async () => {
      const response = await axios.get(`/viewInstructor/?id=${user.user._id}`);
      if (response) {
        setMyInstructor(response.data.instructor);
        setReviews(response.data.instructor.reviews);
        if(!response.data.instructor.flag)
          setShowContract(true);

      }
    };

    if (user){
    fetchCourses();
    viewInstructor();
    }
  }, [query,price,user]);
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

  useEffect(() => {
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
    pricefiltered,
    subjectfiltered,
    subjectUsedInFilter,
    priceUsedInFilter,
    courses,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setQuery(input);
  };
  const Subjectfilter = async (e) => {
    //subjectfiltered=true;
    const data = await fetchallCourses();
    setSubjectFiltered(true);
    setSubjectUsedInFilter(e);
    //setSubjectUsedInFilter(e.target.value);
    setCourses(data);
  };
  const Pricefilter = async (e) => {
    const data = await fetchallCourses();
    setPriceFiltered(true);
    //setPriceUsedInFilter(e.target.value)
    setPriceUsedInFilter(e);
    setCourses(data);
  };

  const [showAddCourseForm, setShowAddCourseForm] = useState(false);
  const handleAddCourse = async (e) => {
    setShowAddCourseForm(!showAddCourseForm);
  };
  return (
    <div className="row px-5 py-2">
      <div className="col-8">
        <div className="mx-5 my-2">
          <form onSubmit={handleSubmit} className="wrapper w-50 me-4 ">
            <button className="searchButton">
              <img
                alt="text"
                className="search-icon"
                src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2Ljk2NiA1Ni45NjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU2Ljk2NiA1Ni45NjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTU1LjE0Niw1MS44ODdMNDEuNTg4LDM3Ljc4NmMzLjQ4Ni00LjE0NCw1LjM5Ni05LjM1OCw1LjM5Ni0xNC43ODZjMC0xMi42ODItMTAuMzE4LTIzLTIzLTIzcy0yMywxMC4zMTgtMjMsMjMgIHMxMC4zMTgsMjMsMjMsMjNjNC43NjEsMCw5LjI5OC0xLjQzNiwxMy4xNzctNC4xNjJsMTMuNjYxLDE0LjIwOGMwLjU3MSwwLjU5MywxLjMzOSwwLjkyLDIuMTYyLDAuOTIgIGMwLjc3OSwwLDEuNTE4LTAuMjk3LDIuMDc5LTAuODM3QzU2LjI1NSw1NC45ODIsNTYuMjkzLDUzLjA4LDU1LjE0Niw1MS44ODd6IE0yMy45ODQsNmM5LjM3NCwwLDE3LDcuNjI2LDE3LDE3cy03LjYyNiwxNy0xNywxNyAgcy0xNy03LjYyNi0xNy0xN1MxNC42MSw2LDIzLjk4NCw2eiIgZmlsbD0iIzAwMDAwMCIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"
              />
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
            <button
              className="clear-icon"
              onClick={() => {
                setQuery("");
                setInput("");
              }}
            >
              {" "}
              <ClearIcon color="disabled" />
            </button>
            
          </form>
          <Dropdown onSelect={Subjectfilter} className=" d-inline ">
            <Dropdown.Toggle className="filters">
              {subjectUsedInFilter === "none" ? "subject" : subjectUsedInFilter}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="none">no filter</Dropdown.Item>{" "}
              {subjects.length > 0
                ? subjects.map((subject) => {
                    return (
                      <Dropdown.Item eventKey={subject.subject}>
                        {subject.subject}
                      </Dropdown.Item>
                    );
                  })
                : "no subjects to show"}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown onSelect={Pricefilter} className=" d-inline mx-3 ">
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
        <div className=" font-weight-bold py-3 px-5 ">
          <h2 className="pb-0" > Published Courses: </h2>
          <hr className="mt-0 mb-1" />
          <div className=" row">
            {filteredCourses.length > 0
              ? filteredCourses.map((course,index) => {
                  
                  return (
                    course.published && 
                    <Link
                    className="p-2 col-4"
                      to={`/InstructorViewPublished/${course._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <CourseCard 
                        key={course._id}
                        passCourse={course}
                        price={price}
                        cur={currency}
                        index={index}
                      />
                    </Link>
                  );
                })
              : "no courses to show"}
          </div>
          
        </div>
        <div className="   px-5 ">
        <h2 className="pb-0" > Unpublished Courses: </h2>
          <hr className="mt-0 mb-1" />
          <div className=" row">
            {filteredCourses.length > 0
              ? filteredCourses.map((course,index) => {
                  
                  return (
                    !course.published && 
                    <Link
                    className="p-2 col-4"
                      to={`/instructorViewCourse/${course._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <CourseCard 
                        key={course._id}
                        passCourse={course}
                        price={price}
                        cur={currency}
                        index={index}
                      />
                    </Link>
                  );
                })
              : "no courses to show"}
          </div>
          
        </div>
        
      </div>

      <div className="col-4 my-3">
        <div className="w-75 mx-auto">
        
          <Button
            onClick={handleAddCourse}
            variant="secondary"
            className="w-100"
            size="lg"
            style={{ height: "70px", marginBottom:"20px" }}
          >
            Create New Course
          </Button>
          <div className="row border-top my-4 p-3 text-center">
            <h1>
              <MenuBookIcon sx={{ fontSize: 60 }} />
            </h1>
            <h3>{(courses.filter(c=>{ return c.published} )).length} Published Courses</h3>
          </div>
          {/* <div className="row border-top my-4 p-3 text-center">
            <h1>
              <PeopleOutlineIcon  sx={{ fontSize: 60 }} />
            </h1>
            <h3>X Total Students</h3>
          </div> */}
          <div className="row border-top my-4 p-3 text-center">
            <h1>
              <LocalAtmIcon  sx={{ fontSize: 60 }} />
            </h1>
            <h3> {user.user.balance} Total Revenue</h3>
          </div>
          <div className="row border-top my-4 p-3 text-center">
            <h1>
              <StarBorderIcon  sx={{ fontSize: 60 }} />
            </h1>
            <h3> {user.user.avgRating.toFixed(1)} Average Rating</h3>
          </div>
        </div>

        <Modal show={showAddCourseForm} onHide={handleAddCourse}>
          <CoursesForm id={myInstructor} show={handleAddCourse} />
        </Modal>
      </div>

      <Modal show={showContract}>
        <Contract
          show={() => {
            setShowContract(false);
            console.log("heyyyyyyyyyyyyyy");
          }}
        />
      </Modal>
    </div>
  );
};

export default Instructor;
