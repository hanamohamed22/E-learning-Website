import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';

function SubtitleCard (props) {
    const subtitle=props.passSubtitle;
    //const url= subtitle.img? course.img:"https://fullscale.io/wp-content/uploads/2022/04/hiring-javascript-developers.png";
    //console.log("heyyyyy     "+url)

    //const price= (course.price * props.price).toFixed(0);
    //var newPrice=0
    
    
    

    return(
        <Card key={subtitle._id} className=" subtitleCard " >
            <Card.Body>
           
           
            <Card.Title>{subtitle.title}</Card.Title>
            </Card.Body> 
            
        </Card>
    )

    
}

export default SubtitleCard;