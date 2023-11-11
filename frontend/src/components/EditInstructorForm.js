import { useEffect, useState } from "react";
import axios from "axios";
import {Link ,Navigate,useParams} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import{useNavigate} from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

    const EditInstructorForm=(props)=>{

        const {handleChange,handleSubmit,instructor,id}=props;

        return(
            <div className="container-xl p-4 mt-4">  
                        <div className="row">
                            <div className="col-xl-4">
                                {/* <!-- Profile picture card--> */}
                                <div className="card mb-4">
                                    <div className="card-header">Profile Picture</div>
                                    <div className="card-body text-center">
                                    <img className="instructor-img mb-2 w-100 p-2" src={instructor.img? instructor.img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png" }></img>

                                        {/* <img className="img-account-profile rounded-circle mb-2" src="https://sites.ed.gov/hispanic-initiative/files/2014/09/alexandra_fuentes_pic01-300x289.jpg" alt=""/> */}
                                        <button className="btn btn-primary" type="button">Upload new image</button>
                                    </div>
                                </div>
                                <Link style={{textDecoration: 'none'}} to={`/instructorProfile/${id}`} role="button"><ArrowBackIosIcon/><h6 style={{display:"inline"}}>Back to profile</h6></Link>
                            </div>
                        

                        <div className="col-xl-8">
                            {/* <!-- Account details card--> */}
                            <div className="card mb-4">
                                <div className="card-header">Account Details</div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        
                                        <div className="mb-3">
                                            <label className="small mb-1">Username </label>
                                            <input className="form-control" 
                                            name="username" 
                                            type="text" 
                                            placeholder={instructor.username}
                                            value={instructor.username}
                                            onChange={handleChange}/>

                                        </div>
                                        
                                        {/* <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                                <label className="small mb-1">First name</label>
                                                <input className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value="Valerie"/>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="small mb-1" >Last name</label>
                                                <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value="Luna"/>
                                            </div>
                                        </div> */}

                                        <div className="mb-3">
                                            <label className="small mb-1" >Name</label>
                                            <input className="form-control" 
                                            name="name" type="text"
                                            placeholder={instructor.name}
                                            value={instructor.name}
                                            onChange={handleChange}
                                            />
                                        </div>
                                        
                                        {/* <!-- Form Group (email address)--> */}
                                        <div className="mb-3">
                                            <label className="small mb-1" >Email address</label>
                                            <input className="form-control"
                                            name="email"
                                            type="email" 
                                            placeholder={instructor.email}
                                            value={instructor.email}
                                            onChange={handleChange}/>
                                        </div>

                                        <div className="mb-3">
                                            <label className="small mb-1" >Bio</label>
                                            <textarea className="form-control" 
                                            name="bio"
                                            type="text" 
                                            placeholder={instructor.bio}
                                            value={instructor.bio}
                                            onChange={handleChange}/>

                                        </div>
                                        
                                        <div className="d-flex justify-content-end ">
                                        <button className="btn btn-primary me-2 " type="submit">Save changes</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

        )
    }

    export default EditInstructorForm;