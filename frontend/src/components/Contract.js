import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useAuthContext } from "../hooks/useAuthContext";
import{useNavigate} from 'react-router-dom';
import axios from "axios";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';





const Contract=(props)=>{

    const [checked, setChecked] = useState(false);
    const [contractSubmitted , setContractSubmitted]=useState(false);
    const {user}=useAuthContext();
    const navigate = useNavigate();


    const handleChange = () => {
        setChecked(!checked);
        
    };

    const submitContract = async () => {
        const response = await axios.post(`/instructorFirstLogin/?id=${user.user._id}`);
        if(response){
            console.log("hey")
        props.show();
        navigate(`/editInstructor/${user.user._id}`);}

    

    }

    return(
        <div className='container p-3'>
        {user.message!=="individualTrainee"? <div> {!contractSubmitted?
            <div >
            <Modal.Header>
            <Modal.Title><label className='text-primary'>Welcome To SHYNF Courses</label></Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form>
                <h5>Terms and Conditions</h5>
                <p>please read the following terms and conditions thoroughlybefore accepting</p>
                <ul>
                <li> SHYNF Courses takes 20% commission for every purchase of one of your courses  </li> 
                <li> We have all the right to add/remove promotions on any course</li>

                </ul>
                <p style={{fontWeight:"bold"}}>
                    By clicking accept, you confirm that you have thoroughly read the terms and conditions of SHYNF courses and agree to all of them
                </p>
            </form>
        <div className='d-flex p-2'> <input class="form-check-input" type="checkbox" onChange={handleChange} />Accept</div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary"  onClick={()=>{setContractSubmitted(true)}} disabled={!checked} > Done</Button>
        </Modal.Footer>    
        </div>:
        <div className="justify-content-center">
            <Modal.Title><label className='text-primary'>Confirmed</label></Modal.Title>
            <Modal.Body>
            <ThumbUpOffAltIcon/><h5>Contract is confirmed Successfully</h5>
                
                <p>you will be directed to your profile page to edit your personal info and password</p>
                
    
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary"  onClick={submitContract}  > Okay </Button>
            </Modal.Footer>    
        </div>
        
        
        
        }</div> : 
        <div >
        <Modal.Header>
        <Modal.Title><label className='text-primary'>Welcome To SHYNF Courses</label></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
            <h5>Terms and Conditions</h5>
            <p>please read the following privacy policy and conditions thoroughlybefore accepting</p>
            <ul>
            <li>In general, imagery, video, and audio materials produced for and by the SHYNF Courses are considered public domain and not copyrighted within the Egypt and are available for use. 
                For international use, please contact the Admin to request permission.
                You may use SHYNF multimedia for education or informational purposes, 
                including photo collections, public exhibits and internet web pages.  
              Some materials may contain a Copyright Notice. 
               It is your responsibility to identify the copyright owner and to obtain permission before making use of this material.  </li> 
            <li> We have all the right to add/remove promotions on any course</li>

            </ul>
            <p style={{fontWeight:"bold"}}>
                By clicking accept, you confirm that you have thoroughly read the terms and conditions of SHYNF courses and agree to all of them
            </p>
        </form>
    <div className='d-flex p-2'> <input class="form-check-input" type="checkbox" onChange={handleChange} />Accept</div>
    </Modal.Body>
    <Modal.Footer>
    <Button variant="primary"  onClick={()=>{setContractSubmitted(true)}} disabled={!checked} > Done</Button>
    </Modal.Footer>    
    </div>
    }
    </div>
    )
}

export default Contract;