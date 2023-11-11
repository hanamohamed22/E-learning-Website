import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Card, Row, Button,Col} from "react-bootstrap";
import CreditCardForm from "./CreditCardForm";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./PaymentComponent.css";
// import "./elements.css";
import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import {Link ,useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
//config of fonts for the stripe prebuilt elements
const ELEMENTS_OPTIONS = {
    fonts: [
        {
            cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
        },
    ],
};

//component
export default function PaymentComponent(props) {
    //history object for redirects
  //let history = useHistory();
  const { id } = useParams();//courseId
  const courseId=id.split("=")[1];
  const [course,setCourse]=useState()
  const navigate = useNavigate();
  useEffect(() => {
    console.log(course)
  },[course]);
  useEffect(() => {
    const fetchCourse = async () => {
      const response = await axios.get(`/viewRegisteredCourse?id=${courseId}`);
      console.log(response)
      if (response) {
        setCourse(response.data);
      } else {
        alert("can't find course");
      }
    }

    fetchCourse();
   
},[])
    //render
    return (
        
        //bootstrap card container
        <Card  id="paymentWidgetContanerCard " className="w-75 mx-auto">

            {/* header and back button */}
            <Card.Header>
                <Row>
                    <Col md="auto">
                        <Button  variant="outline-secondary" className="PaymentButtons  "
                            //variant="danger"
                            onClick={() => {
                                //history.push("/");
                                navigate('/');
                            }}
                        >
                            Back
                        </Button>
                    </Col>
                </Row>
            </Card.Header>

            {/* body */}
            <Card.Body className="p-3">

                {/* Elements Wrapper and checkout form component */}
              {course?  <Elements
                    stripe={loadStripe(props.keys.stripe)}
                    options={ELEMENTS_OPTIONS}
                >
                 <CreditCardForm courseId={courseId} course={course}/>
                </Elements>:null}
            </Card.Body>
        </Card>
    );
}