import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Confetti from "react-confetti";
import axios from "axios";
import Pdf from "react-to-pdf";
import Button from "react-bootstrap/Button";
import "./pages.css";
import MyCertificate from "../images/Certificate.jpg";
import jsPDF from "jspdf";
import { renderToString } from "react-dom/server";
import { useAuthContext } from '../hooks/useAuthContext'
require("typeface-pinyon-script");
const ref = React.createRef();

const Certificate = () => {
  const width = window.innerWidth - 20;
  const height = window.innerHeight + 600;
  const { studentId, courseId } = useParams();
  const [trainee, setTrainee] = useState({});
  const [course, setCourse] = useState({});
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [confetti, setConfetti] = useState(true);
const [send, setSend] = useState(false);
const[mail,setMail]=useState(false);
const[taken,setTaken]=useState(false);
const { user } = useAuthContext();

  useEffect(() => {
    const fetchTrainee = async () => {
      const response = await axios.get(`/viewTrainee?id=${studentId}`);
      if (response.data.trainee) {
        setTrainee(response.data.trainee);
        if(response.data.trainee.email){
          setMail(true)
        }
      } else {
        const res = await axios.get(`/viewCorpTrainee?id=${studentId}`);
        if (res) {
            setTrainee(res.data.corptrainee);
            console.log(res.data.corptrainee)
            if(res.data.corptrainee.email){
              setMail(true)
            }
          }else{
        alert("errorrrrrrr");
          }
      }
    };
    const fetchCourse = async () => {
      const response = await axios.get(`/viewRegisteredCourse?id=${courseId}`);
      if (response) {
        setCourse(response.data);
        setTitle(response.data.title);
        setName(response.data.instructor.name);
      } else {
        alert("can't find course");
      }
    };
    const fetchTakes = async () => {
      const response = await axios.get(`/studentTakesCourse?courseId=${courseId}&studentId=${user.user._id}&studentType=${user.message}`)
       
      if (response) {
          
          setTaken(response.data.certificate)
          console.log(taken);
         }
       
      }
    fetchTrainee();
    fetchCourse();
    fetchTakes();
    setTimeout(() => {
      setConfetti(false);
    }, 8000);
    //console.log(send,mail)
    
  }, [studentId, courseId,taken]);

  useEffect(()=>{
    console.log(send,mail,name,title,taken)

    if(!send && mail &&name&&title &&!taken){
      console.log("here")
      pdf();
      setSend(true)
      setTimeout(async() => {email();}
     ,30000)
    
     const sendcertificate=async()=>{
     await axios.post('/addCertificate',{
      courseId:courseId,studentId:user.user._id,studentType:user.message
    });
    
  }
  sendcertificate(); 
    }
  },[taken,mail,name,title])
  

  const Prints = () => (
    <div >
      <img
        alt="certificate"
        style={{
          width:"600pt",
          border: "7px solid",
          borderColor: "#EFA83D",
        }}
        src={MyCertificate}
      ></img>
      <h6
        style={{
          fontFamily: "Pinyon Script",
          fontSize: "55pt",
          color: "#4b1d5e",
          position: "absolute",
          width:"550pt",
          top: "150pt",
          left: "145pt",
        }}
      >
        {trainee.firstname}  {trainee.lastname}
      </h6>
      <h6
        style={{
          fontFamily: "sans-serif",
          fontWeight: "bold",
          fontSize: "10pt",
          color: "#4b1d5e",
          position: "absolute",
          width:"400pt",
          top: "335pt",
          left: "260pt",
        }}
      >
        {name}
      </h6>
      <h6
        style={{
          fontFamily: "sans-serif",
          fontWeight: "bold",
          fontSize: "20pt",
          color: "#4b1d5e",
          position: "absolute",
          width:"300pt",
          top: "220pt",
          left: "245pt",
        }}
      >
        {title} Course
      </h6>
    </div>
  );
  const pdf = () => {
    
    const string = renderToString(<Prints />);
   //const path="C:/Users/NADA HEGAZY/Downloads/CourseCertificate.pdf"
    var doc = new jsPDF("l", "pt", "A4");
    doc.html(string,{
        callback: function (doc) {
          doc.save('Course Certificate');
        },x:20,y:10
        
     })
  //    const pdf = new File([doc.output("blob")], "myDoc.pdf", {
  //     type: "application/pdf",
  // });
      //out = doc.output('datauristring');
     //var blob = new Blob([doc.output('blob')],{type:'application/pdf'});
     //var blobURL=URL.createObjectURL(blob)

            // var formData = new FormData();
            // formData.append('pdf', blob);
     //console.log(out);
     
  };
    const email=async()=>{
      await axios.post('/mailsender?',{doc: course.title,email:trainee.email}).then((res) => {
        if(res.status === 'ok') console.log("Yeah!");
        else console.log(":(");
     })

    }

  const options = {
    orientation: "landscape",
  };
  return (
    <div>
      {confetti ? <Confetti width={width} height={height} /> : <></>}
      <div className="bgCard" style={{ width: "85%" }}>
        <h1 style={{ color: "#8C0909" }}>
          CONGRATULATIONS!
          <br /> {trainee.firstname} ,
        </h1>
        <br />
        <h2>You have successfully completed {course.title} course</h2>

        <div ref={ref} id="pdf">
          <img
            alt="certificate"
            style={{
              width: "95%",
              marginTop: "60px",
              border: "7px solid",
              borderColor: "#EFA83D",
              position:"relative"
            }}
            src={MyCertificate}
          ></img>
          <h6
            style={{
              fontFamily: "Pinyon Script",
              fontSize: "60pt",
              color: "#4b1d5e",
              position:"absolute",
              top:"520pt",
              right:"400pt"
            }}
          >
            {trainee.firstname}{" "} {trainee.lastname}
          </h6>
          <h6
            style={{
              fontFamily: "sans-serif",
              fontWeight: "bold",
              fontSize: "10pt",
              color: "#4b1d5e",
             textAlign:"center",
             position:"absolute",
              top:"765pt",
              right:"515pt"
            }}
          >
            {name}
          </h6>
          <h6
            style={{
              fontFamily: "sans-serif",
              fontWeight: "bold",
              fontSize: "20pt",
              color: "#4b1d5e",
              position:"absolute",
              top:"615pt",
              right:"500pt"
            }}
          >
            {title} Course
          </h6>
        </div>
        <Pdf
          targetRef={ref}
          filename="CourseCertificate.pdf"
          className="text-center"
          options={options}
          x={-2}
          y={-12}
          scale={0.94}
        >
          {({ toPdf }) => (
            <Button
              style={{
                width:"180px",
                marginTop: "20px",
              }}
              onClick={toPdf}
            >
              Download As PDF
            </Button>
          )}
        </Pdf>
        {/* <Button
            style={{
              width: "185px",
              marginTop: "20px",
              fontSize: "15px",
              marginLeft: "50px",
            }}
            
            onClick={email}
          >
            Generate PDF
          </Button> */}
      </div>
    </div>
  );
};

export default Certificate;
