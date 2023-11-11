import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import React, { Component } from 'react';
import {DynamicStar} from 'react-dynamic-star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


function CourseCard (props) {
    const course=props.passCourse;
    //const url= course.img? course.img:;
    const images=[ "https://media.istockphoto.com/id/1358091848/photo/corporate-data-management-system-and-document-management-system-with-employee-privacy.jpg?s=170667a&w=0&k=20&c=neDrQHySABhofW3ABaucvD3a6TligcJzTicv1hA46os=",
    "https://d1ymz67w5raq8g.cloudfront.net/Pictures/1024x536/P/web/n/z/b/onlinecourses_shutterstock_490891228_2000px_728945.jpg",
    "https://media.istockphoto.com/id/1353769234/photo/training-and-skill-development-concept-with-icons-of-online-course-conference-seminar-webinar.jpg?b=1&s=170667a&w=0&k=20&c=Xvgely4jk8x3zPHifnzlsDg4Ou26QtH424SYrMfIbNo=",
    "https://www.franklin.edu/sites/default/files/styles/btcb_photo/public/fr/back%20to%20college%20blog/main%20images/iStock-1081869346.jpg?itok=aBlpXTJR",
    "https://d2o2utebsixu4k.cloudfront.net/media/uploads/2017/05/IT-courses.png",
    "https://openlearning-cdn.s3.amazonaws.com/course__londonmetonline_courses_onlinemba__course-promo-image-1671167491.897287.jpg",
    "https://business.aucegypt.edu/sites/business.aucegypt.edu/files/styles/banner/public/2021-02/Business%20Acumen.jpg?itok=KXKNY0QB",
    "https://www.devry.edu/content/dam/devry_edu/images/medium/pic-courses-ai-machine-learning-healthcare.jpg.dvu.opt-image.500.jpg"];
    const url=images[props.index%images.length];
    const price= (course.price * props.price).toFixed(0);
    var newPrice=0
    if(course.promotion.valid===1)
         newPrice=price-(price*(course.promotion.percent / 100))
    

    return(
        <Card key={course._id} className=" courseCard h-100" >
            <Card.Img src={url} className="courseCardImg" alt="course image here"></Card.Img>
            <Card.Body className="pb-0">
            <Card.Title className='fw-bold'>{course.title}</Card.Title>
            <p>{course.summary.slice(0,75)}{course.summary.slice(0,75).length< course.summary.length && <>.....</>}</p>
            
            <AccessTimeIcon className="float-start" fontSize="small" color="action"/><p> {course.totalHours} hrs</p>
            <p>by : {course.instructor.username}</p>
            <div className='d-flex'>
                <DynamicStar
                rating={course.avgRating} 
                width={17} 
                height={15}
                emptyStarColor={"#C5C5C5"}
                sharpnessStar={2.2}
                />
                <p style={{fontSize:"0.8rem"}} className='mx-1 fw-light'>({course.reviews.length})</p>
            </div>
            </Card.Body> 
            <Card.Footer>
            {newPrice>0?
                <div className='d-flex flex-row-reverse'><h5 className="fw-bold">{newPrice} {props.cur}</h5><p className="text-decoration-line-through mx-2">{price}</p> </div> :
                isNaN(price)?<div></div>:<div className="text-end"> <h5 className="fw-bold">{price} {props.cur}</h5></div>}

            </Card.Footer>
            
        </Card>
    )

    
}

export default CourseCard;