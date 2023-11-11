import { useEffect, useState } from "react";
import {Link ,Navigate,useParams} from "react-router-dom";

import axios from "axios";
import Table from 'react-bootstrap/Table';
import MyImage from '../images/wallet.jpg' 
import { useAuthContext } from '../hooks/useAuthContext'
    const TraineeWallet=()=>{
        
       // const { id } = useParams();
       const { user } = useAuthContext()
       const [id,setId]=useState('')
        const [trainee,setTrainee]=useState({});
        const [balance,setBalance]=useState(0);
        const [refunds,setRefunds]=useState([]);


        
       

    useEffect(() => {
        // if(user){
        //     setTrainee(user.user)
        //     console.log(id)
        //     setId(id)
        //   }
        const fetchRefunds = async () => {
            const response = await axios.get(`/traineeRefundRequests?traineeId=${user.user._id}`);
            if (response) {
                setRefunds(response.data);
                
            }
            else{
                alert("errorrrrrrr");
            }
        };

        if (user){
        fetchRefunds();
        }
    },[user]);

        return(
            
        <div>
            <div className="bgCard">
            {refunds.length>0?
            <div>
                <h3>Course Refunds</h3>
                <br/>
                <Table striped >
                <thead>
                <tr>
                    <th>Course</th>
                    <th>State</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                    {refunds.map(ref=>{ return (
                    
                        <tr style={ref.state==="rejected"?{color:"red"}:{color:"black"}}>
                            <td>{ref.course.title}</td>                            
                            <td>{ref.state}</td>
                            <td>{ref.value}</td>
                        </tr>

                    )})}
                </tbody>
                    <tr >
                        <td className="py-3 "><h5 >Total Balance</h5></td>
                        <td> </td>
                        <td className="py-3"><h5>{user.user.balance} EGP</h5></td>
                    </tr>
                </Table>
                
                
            </div>:
            <div >
            <h2>
                Your Balance from Refunded courses appears here
            </h2>
            <img style={{width:"20%"}}src={MyImage}></img>
            <p>You have no refunds </p>

            </div>}
            </div>



        </div>

    

        )
    }

    export default TraineeWallet;
