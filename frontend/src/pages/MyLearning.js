import { useEffect, useState } from "react";
import axios from "axios";
import {Link ,Navigate,useParams} from "react-router-dom";

import InstructorCourseCard from "../components/InstructorCourseCard";
import Button from 'react-bootstrap/Button';
import { useAuthContext } from '../hooks/useAuthContext'
import CourseCard from "../components/CourseCard";




const MyLearning = () => {
  const [id,setId]=useState('')
  const { user } = useAuthContext();
 console.log(user)
//const { id } = useParams();
console.log(id)
// const id="638cbd05b6e568db74b37511";
const studentType="individualTrainee";     
const[courses,setCourses]=useState([]);
    
    useEffect(() => {
      if(user){
        setId(user.user._id)
        console.log(id)
      }
        const fetchCourses = async () => {
            const response = await axios.get(`/studentCourses/?studentId=${user.user._id}&studentType=${user.message}`);
            if (response) {
                setCourses(response.data.map(obj=>{return obj.course}));
            }
        };
    if(user){
    fetchCourses();
    }
  }, [user]);
  
 
    return (
        <div className="container w-75">
            <h2>My Courses</h2>
            <div className="row">  
                {courses.length>0? courses.map((course,index)=>{return(
                 
                <Link to={`/course/${course._id}`} style={{ textDecoration: 'none'}} className=" col-3" >
                  <CourseCard key={course._id} passCourse={course} index={index}  />
                  </Link>
                  )}):"no courses to show"}         
          </div>
      </div>
    
  );
}

export default MyLearning;
