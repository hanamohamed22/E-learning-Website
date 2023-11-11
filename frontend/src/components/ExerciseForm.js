import { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {DynamicStar} from 'react-dynamic-star';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { Component } from 'react';
import { Rating } from 'react-simple-star-rating'
import {Link ,useParams} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
//import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';



function ExerciseForm(props) {
    const {subtitleId,showExerForm,handleExerForm,addExer,handleExerChange}=props;
    const [isCorrect,setIsCorrect]=useState("");
    useEffect(() => {
    },[subtitleId]);
    const handleSelection = (e)=>{
        console.log(e.target.value)
   setIsCorrect(e.target.value);
  //handleExerChange();
    }
    
    return(
        <Modal show={showExerForm} onHide={handleExerForm}>
                <Modal.Header closeButton onClick={handleExerForm}>
                    <Modal.Title>Add Exercise</Modal.Title>    
                </Modal.Header>
                <Form>
                <Modal.Body>
                    
                        <Form.Group  controlId="" fullWidth="true">
                        <Form.Label>Question</Form.Label>
                        <Form.Control required="true"
                            name="question"
                            type="text"
                            fullWidth="true"
                            style={{
                                margin: '10px 0px',
                                padding: '8px 3px',
                                borderRadius: '5px'
                              }}
                            onChange={handleExerChange}
                            autoFocus
                        />
                       
                        </Form.Group>
                        <div className="row">
                            <Form.Group
                            className="mb-3 col-6"
                            controlId="">
                            
                                 <Form.Label>Answer 1</Form.Label>
                        <Form.Control
                            name="answer1"
                            type="answer"
                            onChange={handleExerChange}
                            autoFocus
                        />
                        {/* <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="answer1-isCorrect" onClick={handleExerChange}>
                          <FormControlLabel value="true" control={<Radio />} label="Correct" />
                          <FormControlLabel value="false" control={<Radio />} label="Incorrect" /> 
   
                         </RadioGroup>*/}
                        <Form.Label>Answer 2</Form.Label>
                        <Form.Control
                            name="answer2"
                            type="answer"
                            onChange={handleExerChange}
                            autoFocus
                        />
                         {/* <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="answer2-isCorrect" onClick={handleExerChange}>
                           <FormControlLabel value="true" control={<Radio />} label="Correct" />
                          <FormControlLabel value="false" control={<Radio />} label="Incorrect" />
   
                         </RadioGroup> */}
                        <Form.Label>Answer 3</Form.Label>
                        <Form.Control
                            name="answer3"
                            type="answer"
                            onChange={handleExerChange}
                            autoFocus
                        />
                         {/* <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="answer3-isCorrect" onClick={handleExerChange}>
                          <FormControlLabel value="true" control={<Radio />} label="Correct"  />
                          <FormControlLabel value="false" control={<Radio />} label="Incorrect" /> 
   
                         </RadioGroup>*/}
                        <Form.Label>Answer 4</Form.Label>
                        <Form.Control
                            name="answer4"
                            type="answer"
                            onChange={handleExerChange}
                            autoFocus
                        />
                         {/* <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="answer4-isCorrect" onClick={handleExerChange}>
                          <FormControlLabel value="true" control={<Radio />} label="Correct" />
                          <FormControlLabel value="false" control={<Radio />} label="Incorrect" />
    
                         </RadioGroup>*/}
                            </Form.Group>
                            <Box sx={{ minWidth: 120 }}>
                            <Form.Label>Which one is the correct answer?</Form.Label>  
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label"></InputLabel>
                           
                        <Select
                         labelId="demo-simple-select-label"
                        id="demo-simple-select"
                         name="isCorrect"
                         value={isCorrect}
                        label="isCorrect"
                        onChange={(e)=>{handleExerChange(e); setIsCorrect(e.target.value)}}>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        </Select>
                    </FormControl>
                    </Box>
                        </div>
                   
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"  onClick={handleExerForm}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={addExer}>
                        Add
                    </Button>
                </Modal.Footer>
                </Form>
      </Modal>


    )
}

export default ExerciseForm