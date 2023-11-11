
import { useEffect, useState} from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function CourseList (props) {  
    const courseid=props.button
    const courses=props.courses
   
    //const [courses, setCourses]=useState([]);
    const [coursetoget,setCoursetoget]=useState({});
    const[subtitle,setSubtitles]=useState([]);

    useEffect(()=> {

        for (let i = 0; i < courses.length; i++) {
            
            if(courses[i]._id===courseid){
                setCoursetoget(courses[i]);
                }
          }// i want to get back elcourse elhakhod id bta3o

          
          const fetchSubs = async () => {
            const response = await axios.get(`/subtitles/?courseId=${courseid}`);
            if (response) {
                setSubtitles(response.data); //awl ma yebda2 dol el hyb2o displayed
            }
            else{
                setSubtitles([]);
          };
        }
        fetchSubs();
        console.log(subtitle);
        },[courseid])
    return ( 
        <Card className="row">
       <Card.Header as="h3">{coursetoget.title} </Card.Header>
        <Card.Title> Subtitles:</Card.Title>
        <ListGroup className="list-group-flush">{subtitle.length>0? subtitle.map((sub)=>{return(<ListGroup.Item>{sub.title} : {sub.hours} hours  {sub.exercises} </ListGroup.Item>)}) : <ListGroup.Item>"no subs"</ListGroup.Item>}</ListGroup>
      <Card.Subtitle className='mt-3'>Price:</Card.Subtitle> <Card.Body> {coursetoget.price}</Card.Body>
        
      </Card>

 )
}
 
export default CourseList;