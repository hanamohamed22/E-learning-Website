
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import CourseList from "../components/CourseList";
import SearchIcon from '@mui/icons-material/Search';
import CourseCard from "../components/CourseCard";
import Filter from "../components/Filter";
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import InstructorCourseCard from "./InstructorCourseCard";


function CardsCarousel(props) {

    //const idTemp=props.id
    // const idTemp = "635a48148964b6e199512fe3"; //id mo2akat
    const courses=props.courses;

    const splitCourses=courses.length>0 && courses.map((e, i) => { 
      return i % 4 === 0 ? courses.slice(i, i + 4) : null;}).filter(e => { return e; });
     

    return(
        <div>

<Carousel variant="dark cardsCarousel" >
{splitCourses.length>0 && splitCourses.map((arr)=>{
    return(
        <Carousel.Item>
            <div className="w-75  d-flex justify-content-center mx-auto  row " >
            {arr.map((course,index)=>{
                return(
                  <Link to={`/course/${course._id}`} style={{ textDecoration: 'none'}} className=" col-lg-3 col-md-6 col-xs-12 " >
                  <CourseCard key={course._id} passCourse={course} price={props.price} cur={props.currency} index={index}/>
                  </Link>
                )
            })}
            </div>
            
        </Carousel.Item>


                )
            })}

           
    
    
  </Carousel>
  </div>
)
}

export default CardsCarousel;