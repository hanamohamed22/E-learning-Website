
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {DynamicStar} from 'react-dynamic-star';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { Component } from 'react';
import { Rating } from 'react-simple-star-rating'
import {Link ,useParams} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


function PromoForm(props) {
    const {id,showPromoForm,handlePromoForm,handleChange,addPromo}=props;



    return(
        <Modal show={showPromoForm} onHide={handlePromoForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Promotion</Modal.Title>    
                </Modal.Header>
                <Form>
                <Modal.Body>
                    
                        <Form.Group className="mb-3 w-25" controlId="">
                        <Form.Label>Percentage</Form.Label>
                        <Form.Control
                            name="percent" min="0" max="100" step=".5"
                            type="number"
                            onChange={handleChange}
                            autoFocus
                        />
                        </Form.Group>
                        <div className="row">
                            <Form.Group
                            className="mb-3 col-6"
                            controlId=""
                            >
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control 
                                 name="startDate" 
                                 type="date"
                                 onChange={handleChange}
                                  />
                            </Form.Group>

                            <Form.Group
                            className="mb-3 col-6"
                            controlId=""
                            >
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control 
                                 name="endDate" 
                                 type="date"
                                 onChange={handleChange}
                                  />
                            </Form.Group>
                        </div>
                   
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"  onClick={handlePromoForm}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={addPromo}>
                        Save Changes
                    </Button>
                </Modal.Footer>
                </Form>
      </Modal>


    )
}

export default PromoForm