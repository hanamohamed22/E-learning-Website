
import Button from 'react-bootstrap/Button';

import React from 'react';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
//import * as React from 'react';




function VideoForm(props) {
    const {addSubVideo,showVideoForm,handleVideoForm,handleVideoChange}=props
   
    return(
        <Modal show={showVideoForm} onHide={handleVideoForm}>
                <Modal.Header closeButton onClick={handleVideoForm}>
                    <Modal.Title>Add Video</Modal.Title>    
                </Modal.Header>
                <Form>
                <Modal.Body p-2>
                    
                        <Form.Group className="mb-3 w-100" controlId="">
                        <Form.Label>Video URL</Form.Label>
                        <Form.Control   required="true"
                            name="videoURL"
                            type="text"
                            onChange={handleVideoChange}
                            autoFocus
                        />
                       
                        </Form.Group>
                        <Form.Group className="mb-3 w-100" controlId="">
                        <Form.Label>Description</Form.Label>
                        <Form.Control  required="true"
                            name="description"
                            type="text"
                            onChange={handleVideoChange}
                            autoFocus
                        />
                       
                        </Form.Group>
                        
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={addSubVideo}>
                        Add
                    </Button>
                </Modal.Footer>
                </Form>
      </Modal>


    )
}

export default VideoForm