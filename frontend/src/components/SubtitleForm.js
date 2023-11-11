
import { useEffect, useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import YouTube, { YouTubeProps } from "react-youtube";




    const SubtitleForm=(props)=>{
    const [displayMssg, setDisplayMssg]= useState("");
    const [embedId,setEmbedId]= useState("");
    const [url,setUrl]= useState("");
    const [duration,setDuration]=useState(0);
    const [subtitle, setSubtitle]= useState({
        title:"",
        video:[],
        description:"",
        course:"",
        hours:""
    }); 
   
    
   const changeHandler=(e)=>{
        const {name,value}= e.target;
        setSubtitle((prev)=>{
            return{...prev, [name]:value }; 
        })
        if(name==="video"){
            
        console.log(e.target);
            setUrl(value);
        }
   } 
   
   useEffect(()=>{

    const submit=async()=>{
        console.log(duration)
    if(duration){
    if (subtitle.title!=="" && subtitle.video.videoURL!==[] && subtitle.description!=="" ){
        setDisplayMssg("")
        try {
            const res=await axios.post("/addSubtitle", {
                title:subtitle.title,
                video:[{videoURL:subtitle.video,description:subtitle.description,duration:(duration/3600).toFixed(3)}],
                course:props.courseId ,
                duration:(duration/3600).toFixed(3),
                exercises:[]
            });
        console.log(res)
        
        } catch (err) {
            alert("Couldn't add subtitle");
        }

        setSubtitle({
            title:"",
            video:"",
            description:"",
            hours:""
        
        })
        setDuration(0);
        setEmbedId("");
    }
    else{
        setDisplayMssg("please fill in all the required fields")
    }}
    }
    submit();
   },[duration]);
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submitted");
        console.log(duration);
        setEmbedId(url.split("v=")[1].split("&")[0]);
       
    }
    const doneClicked=(e)=>{
        e.preventDefault();
        handleSubmit(e);
        props.show();
        //console.log("hana" + props.data);
        //ask bet3ml eh
    }
    
    return (
<div >
    
    <div>
    <Modal.Header closeButton >
        <Modal.Title>Add Subtitle</Modal.Title>    
    </Modal.Header>
    
    <Form className="create"  onSubmit={handleSubmit} >
    <Modal.Body>

        <h5>subtitle:</h5>
        <p className="text-danger">{displayMssg}</p>
        <Form.Control 
        type="text"
        name="title"
        placeholder="title"
        onChange={changeHandler}  
        value={subtitle.title} 
        />
        <Form.Control  
        type="text"
        name="video"
        placeholder="video url"
        onChange={changeHandler}  
        value={subtitle.video} 
        />
        <Form.Control 
        type="text"
        name="description"
        placeholder="description"
        onChange={changeHandler}  
        value={subtitle.description} 
        />
        {/* <Form.Control 
        type="text"
        name="hours"
        placeholder="total hours"
        onChange={changeHandler}  
        value={subtitle.hours} 
        /> */}
        {/* <Form.Control 
        type="text"
        name="exercises"
        placeholder="exercises"
        onChange={changeHandler}  
        value={subtitle.exercises} 
        /> */}
    </Modal.Body>
    <Modal.Footer>
    <Button variant="outline-primary" type="submit"> Add Subtitle</Button>
    <Button variant="primary" type="submit" onClick={doneClicked}>Done</Button>
    {embedId&&<YouTube style={{display:"none"}} videoId={embedId}  onReady={(e)=>{setDuration(e.target.getDuration())}}  />}

    </Modal.Footer>
    </Form> </div> 
 
</div>
    
    )
}
export default SubtitleForm;