import { useEffect, useState } from "react";
import axios from "axios";
import {Link ,Navigate,useParams} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import{useNavigate} from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

    const EditCorporateTraineeForm=(props)=>{

        const {handleChange,handleSubmit,corptrainee,id}=props;

        return(
            <div className="container-xl py-4 mt-1">  
            <div className=" mx-auto">
                
                <div className="card mb-4">
                  
                    <div className="card-body w-75 mx-auto py-4">
                        <form onSubmit={handleSubmit}>
                            
                            <div className="mb-3">
                                <label className="small mb-1">Username </label>
                                <input className="form-control" 
                                name="username" 
                                type="text" 
                                placeholder={corptrainee.username}
                                value={corptrainee.username}
                                onChange={handleChange}/>

                            </div>
                            
                            <div className="mb-3">
                                <label className="small mb-1" >Email address</label>
                                <input className="form-control"
                                name="email"
                                type="email" 
                                placeholder={corptrainee.email}
                                value={corptrainee.email}
                                onChange={handleChange}/>
                            </div>
                            <div className="mb-3">
                                <label className="small mb-1" >First Name</label>
                                <input className="form-control"
                                name="firstname"
                                type="firstname" 
                                placeholder={corptrainee.firstname}
                                value={corptrainee.firstname}
                                onChange={handleChange}/>
                            </div>
                            <div className="mb-3">
                                <label className="small mb-1" >Last Name</label>
                                <input className="form-control"
                                name="lastname"
                                type="lastname" 
                                placeholder={corptrainee.lastname}
                                value={corptrainee.lastname}
                                onChange={handleChange}/>
                            </div>

                            
                            <div className="d-flex justify-content-end ">
                            <button className="btn btn-primary me-2 " type="submit">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            <Link style={{textDecoration: 'none'}} to='/corporateTrainee' role="button"><ArrowBackIosIcon/><h6 style={{display:"inline"}}>Back to Home</h6></Link>

        </div>
        </div>

        )
    }

    export default EditCorporateTraineeForm;