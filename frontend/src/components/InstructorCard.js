import Card from 'react-bootstrap/Card';
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors';

function InstructorCard (props) {
    const instructor=props.passInstructor;
   
    return(
        <div key={instructor._id} className=" instructorCourseCard row my-4" >
           
            <div className="col-9 p-3">
                <h5 className="fw-bold">{instructor.name}</h5>
                <p>{instructor.username}</p>
                {instructor.avgRating&& <div className="d-flex">
                    <p className="mx-1 small">{(Math.round(instructor.avgRating * 10) / 10)}</p> 
                    <StarIcon sx={{ color: yellow[700] ,fontSize: 20 }}/>
                    <p style={{fontSize:"0.8rem"}} className='mx-1 fw-light'>({instructor.reviews.length} reviews) </p>
                </div>}
                         
            </div> 
        </div>
    )

    
}

export default InstructorCard;