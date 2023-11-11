import { useEffect, useState } from "react";
import {Link ,Navigate,useParams} from "react-router-dom";

import axios from "axios";
import Table from 'react-bootstrap/Table';
import MyImage from '../images/wallet.jpg' 
import { useAuthContext } from '../hooks/useAuthContext'
    const InstructorWallet=()=>{
        
       // const { id } = useParams();
       const { user } = useAuthContext()
       const [id,setId]=useState('')
        const [instructor,setInstructor]=useState({});
        //const [balance,setBalance]=useState(0);
        const [payment,setPayment]=useState(0);
        const [courses,setCourses]=useState([]);
        const [numberofstudentsineverycourse,setNumberOfStudentsInEveryCourse]=useState([])
       const query=""
        
       

    useEffect(() => {
        // if(user){
        //     setTrainee(user.user)
        //     console.log(id)
        //     setId(id)
        //   }
        // const fetchNumberofStudents = async () => {
        //     const response = await axios.get(
        //       `/numberofstudents/?id=${user.user._id}&q=${query}`
        //     );
        //     console.log(numberofstudentsineverycourse)
        //     if (response) {
        //       setNumberOfStudentsInEveryCourse(response.data); //awl ma yebda2 dol el hyb2o displayed
        //     }
        //   };
    //    const fetchCourses = async () => {
    //         const response = await axios.get(
    //           `/instructorCourses/?id=${user.user._id}&q=${query}`
    //         );
    //         if (response) {
    //           setCourses(response.data); //awl ma yebda2 dol el hyb2o displayed
    //         }
    //       };
        const fetchPayment = async () => {
            const response = await axios.get(`/instructorpayment?id=${user.user._id}`);
            console.log(response.data)
            if (response) {
                console.log(response.data)
                setPayment(response.data); 
            }
            else{
                alert("errorrrrrrr");
            }
        };

        if (user && id===""){
        setId(id)
        fetchPayment();
    //    fetchCourses();
    //    fetchNumberofStudents();
        }
    },[user,id]);

        return(
            <div>
            <div className="bgCard">
            {payment.length>0?
            <div>
                <h3>Balance Info</h3>
                <br/>
                <Table striped  >
                <thead>
                <tr>
                    <th>Course</th>
                    <th>Price</th>
                    <th>Number of Students</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                    {payment.map((p, index) => {
            return (

                        <tr>
                            <td>{p.course.title}</td>                            
                             <td>{p.course.price}</td> 
                            <td>{p.numberofstudents}</td>
                            <td>{p.amountpercourse}</td>
                        </tr>

                    )})}
                </tbody>
                    <tr >
                        <td className="py-3  "><h5 >Total Balance</h5></td>
                        <td> </td>
                        <td> </td>
                        <td className="py-3"><h5>{user.user.balance} EGP</h5></td>
                    </tr>
                </Table>
                
                
            </div>:
            <div >
            <h2>
                Your Balance from courses appears here
            </h2>
            <p>You have no balance </p>
            <img style={{width:"10%"}}src={MyImage}></img>
            </div>}
            </div>



        </div>
        // <div>
        //     <div className="bgCard">    
        //     <div >
        //     <h2>
        //         Your Balance from taught courses appears here
        //     </h2>
        //     <h2>{instructorPayment}</h2>
        //     </div>
        //     </div>
        // </div>

    

        )
    }

    export default InstructorWallet;
