import Card from 'react-bootstrap/Card';
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function InstructorCourseCard (props) {
    const course=props.passCourse;
    // const url= course.img? course.img:"https://fullscale.io/wp-content/uploads/2022/04/hiring-javascript-developers.png";

    console.log(course.price)
    const price= (course.price * props.price).toFixed(0);
    var newPrice=0
    if(course.promotion.valid===1)
         newPrice=price-(price*(course.promotion.percent / 100))
    

    return(
        <div key={course._id} className=" instructorCourseCard row  p-3 rounded" >
            {/* <div className=' col-3 p-0 ' >
                <img className="instructorCourseImg" src={url} alt="course image here"/>
            </div> */}
            <div className="col-6 p-3">
                <h5 className="fw-bold">{course.title}</h5>
                <p>{course.summary}</p>
                {course.avgRating&& <div className="d-flex">
                    <p className="mx-1 small">{(Math.round(course.avgRating * 10) / 10)}</p> 
                    <StarIcon sx={{ color: yellow[700] ,fontSize: 20 }}/>
                    <p style={{fontSize:"0.8rem"}} className='mx-1 fw-light'>({course.reviews.length} reviews) </p>
                </div>}
                {typeof price !== 'undefined'&&
                <>
                {newPrice>0?
                <div className='d-flex'><h5 >{newPrice} {props.currency}</h5><p className="text-decoration-line-through ms-2">{price}{props.cur}</p></div> :price>=0?
                <div> <h5 >{price} {props.currency}</h5></div>:<></>}</>}
                <AccessTimeIcon fontSize="small" color="action"/> {course.totalHours} hours                
            </div> 
            {course.promotion.valid ?
             <div className='col-6 py-5 border-start'>
            <p ><label>promotion:</label> {course.promotion.percent}%{" "}</p>
            <p><label>Starts:</label> {course.promotion.startDate.substring(0, 10)}{" "}</p>
            <p><label>Ends:</label> {course.promotion.endDate.substring(0, 10)}</p>
          </div >:
          <div className="col-6 py-5"></div>
            }
        </div>
    )    
}

export default InstructorCourseCard;