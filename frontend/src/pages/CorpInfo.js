import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function CorpInfo (props) {
    console.log(props.corpTrainee);
    const CorpTrainee=props.corpTrainee

    return(
        <div className='instructor-info' >
           
            <div className="instructor-pinfo">
            <h2>{CorpTrainee.name}</h2>
            </div>


            
        </div>

    )
}
export default CorpInfo;