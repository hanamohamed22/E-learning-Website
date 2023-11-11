import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function InstructorInfo (props) {
    console.log(props.instructor);
    const instructor=props.instructor

    return(
        <div className='instructor-info' >
            <img className="instructor-img" src={instructor.img? instructor.img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"}></img>
            <div className="instructor-pinfo">
            <h2>{instructor.name}</h2>
            <p>Dr in Ain Shams</p>
            {instructor.avgRating&& <div className="d-flex">
            <StarIcon sx={{ color: yellow[700] ,fontSize: 20 }}/>
                    <p className="mx-1 small">{(Math.round(instructor.avgRating * 10) / 10)}</p> 
                </div>}
            </div>

            <div className="instructor-bio">
            <h4>Bio:</h4>
            <p>{instructor.bio}</p>

            </div>

            
        </div>

    )
}
export default InstructorInfo