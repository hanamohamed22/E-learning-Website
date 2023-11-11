import Button from "react-bootstrap/esm/Button";
import Modal from 'react-bootstrap/Modal';


const AlertModal =  (props) => {

    return(
        <Modal show={props.show} onHide={props.hide} className="text-center" >

        <Modal.Header closeButton>   
        </Modal.Header>

        <Modal.Body>
            <p>{props.message}</p> 
            
            <Button onClick={props.hide}>Ok</Button>
        </Modal.Body>

       

        
        
        </Modal>
    )


}

export default AlertModal;