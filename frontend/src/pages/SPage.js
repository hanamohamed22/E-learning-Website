// import { useEffect, useState} from 'react'
// import axios from 'axios';
// import "../pages/pages.css";

// import CourseList from '../components/CourseList';
// //import { set } from 'mongoose';


// function Search(props){
//     const [courses, setCourses]=useState([]);
//     const [buttonid, setButtonId]=useState('');
//     const [isComponentVisible, setState]=useState(false);
//     const countryToCurrency = require( 'country-to-currency' );
//     const cur=countryToCurrency[props.con.value];

//     //useEffect fires a function once the component is rendered
//     useEffect(()=> {
//         const fetchCourses = async ()=>{
//             const response=await axios.get('/home');
//             setCourses(response.data);
//         }

//         fetchCourses(); //call the created function
//     },[]) //this empty array means the function is fired once when home is rendered not everytime
//     //we created another function inside it to be able to make it async
      
     
//      //constants cant be overwritten
//     const  toggleComponent=(id)=>  { 
//          setState(true)
//          console.log(isComponentVisible)
//           setButtonId(id)
         
//      } 
       
//       const handleClick=(Event)=> {
//         const id = Event.target.id;
//         console.log(id);
//         toggleComponent(id);
//       }
    

//       return(
      
//         <div>
//             <div className="home">
//             <h2>Courses: </h2> 
//            <div>{courses? courses.map((course)=>{return <div key={course._id}>
//             <label> Title:</label> {course.title} 
//         <button id= {course._id} onClick={handleClick}>View</button>
        
       
//             </div>}):"no courses to show"}</div>
//             {/* create a workout component , call it here in map function, let it take workout and key as props */}
//             </div>
//             {/* {isComponentVisible? <h1>{buttonid}</h1> :null} */}
//             {isComponentVisible? <CourseList button={buttonid} courses={courses}/>:null}
         
            
//         </div>
        
//     )
// };

// export default Search;
