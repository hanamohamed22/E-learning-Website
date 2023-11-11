# SHYNF
<p >
 This is an e-learning platform implmeneted by guc students (SHYNF group) for the Candian Chamber of Commerce. 
</p>

## Motivation
<p>
It is a university project for the Advanced Computer Lab Course in collaboration with the Candian Chamber of Commerce to create a full stack fully functional e-learning platform and also a golden opportunity to enhance our web development and team work skills
</p>

## Build Status
<p>
It is not released yet, however it is fully functional and currently in the testing phase.
During testing, we found that:
 1- Home button in admin page is navigating incorrectly
 2- Currency coversion API glitches in some pages
</p> 

## Code Style
- camel casing
- Bootstrap inline styling is used ``` className="m-2" ```
- Arrow functions are used ```  const fnction =(e)=>{} ``` 


## Screenshots
![s1](https://user-images.githubusercontent.com/113841668/210187795-6798246b-1cfe-4bb6-8355-d49f7c23d1b6.jpg)![s2](https://user-images.githubusercontent.com/113841668/210187714-989819cb-96d6-429f-b8cb-db15fab26673.jpg)
![s3](https://user-images.githubusercontent.com/113841668/210187829-28914359-2be9-4a3a-9c51-9953aae3849e.jpg)
![s4](https://user-images.githubusercontent.com/113841668/210188012-3c036c42-b7ee-4802-a357-88702bb18c04.jpg)
![s5](https://user-images.githubusercontent.com/113841668/210188066-255089a2-2081-46ec-be0b-fe553efa6d3f.jpg)
![s6](https://user-images.githubusercontent.com/113841668/210188101-5a191061-c19b-4d18-a16f-e65e199fdcd8.jpg)



## Framework used
<p> MERN stack framework  (Mongoose, Express.js, React.js, and Nodejs)</p>

## Features
<p>The system provides many features for different type of users.</p>

A Guest can
- sign up for an account as an individual trainee using a username, email, password, first name, last name and gender
- view and accept the website/ company refund/ payment policy while signing up
- select their country 
- view all the titles of the courses available including the total hours of the course and course rating
- view the price of each course
- filter the courses based on a subject and/or rating
- filter the courses based on price (price can be FREE)
- search for a course based on course title or subject or instructor
- choose a course from the results and view (but not open) its details including course subtitles, excercises , total hours of each subtitle, total hours of the course and price (including % discount if applicable) according to the country selected
- view a preview video of the course and the course outline before registering for it
- view the most viewed/ most popular courses

An Instructor can
- log in using a username and password
- log out
- view and accept the website/ company refund/ payment policy while signing up
- view and accept the contract which includes all the rights to the posted videos and materials as well as the % taken by the company on each video per registered trainee
- select their country 
- view all the titles of the courses available including the total hours of the course and course rating
- view the price of each course
- filter the courses based on a subject and/or rating
- filter the courses based on price (price can be FREE)
- search for a course based on course title or subject or instructor
- choose a course from the results and view (but not open) its details including course subtitles, excercises , total hours of each subtitle, total hours of the course - and price (including % discount if applicable) according to the country selected
- view a preview video of the course and the course outline before registering for it
- view the most viewed/ most popular courses
- view all the titles of the courses given by him/her
- filter the courses given by him/her based on a subject or price
- search for a course given by him/her based on course title or subject or instructor
- view the ratings and reviews on all his/her courses
- view the amount of money owed per month
- create a new course and fill in all its details inclding title, subtitles, price and short summary about the entire course
- upload a video link from YouTube under each subtitle and enter a short description of the video
- upload a video link from YouTube as a preview to the course
- create a multiple choice exam with 4 choices per question
- set the answers (not visible for the trainee) for multiple choice exercises
- view his/her rating and reviews as an instructor
- edit his/her mini biography or email
- define a promotion for the course (% discount) and for how long
- change his/her password
- receive an email to change a forgotten password
- report a problem with a course. The problem can be "technical", "financial" or "other"
- see all previously repoted problems and their statuses
- follow up on an unresolved problem
- can save his/her progress in creating a course without publishing the course
- can publish his/her course. A published course cannot be edited nor deleted
- can edit or delete a non published course
- can close a published course so no more students can enroll


A Corporate Trainee can
- log in using a username and password
- log out
- select their country 
- view all the titles of the courses available including the total hours of the course and course rating
- filter the courses based on a subject and/or rating
- search for a course based on course title or subject or instructor
- view a preview video of the course and the course outline before registering for it
- view the most viewed/ most popular courses
- open all the items inside a course he/she is registered for including videos and excercises
- change his/her password
- receive an email to change a forgotten password
- rate an instructor 
- rate a course
- solve a multiple choice exercise by choosing the correct answer
- submit the answers to the exercise after completing it
- view his/her grade from the exercise
- view the questions with the correct solution to view the incorrect answers
- watch a video from a course he/she is registered for
- see his/her progress in the course as a percentage of how much of the course has been completed so far
- receive a certificate as a PDF after completing the course via email
- download the certificate as a PDF from the website
- write notes while watching the video
- download the notes as a PDF
- see a list of all the courses he/she is enrolled in on their profile
- report a problem with a course. The problem can be "technical", "financial" or "other"
- see all previously repoted problems and their statuses
- follow up on an unresolved problem
- request access to a specific course they do not have access to

An Individual Trainee can

- log in using a username and password
- log out
- view and accept the website/ company refund/ payment policy while signing up
- view and accept the contract which includes all the rights to the posted videos and materials as well as the % taken by the company on each video per registered trainee
- select their country 
- view all the titles of the courses available including the total hours of the course and course rating
- view the price of each course
- filter the courses based on a subject and/or rating
- filter the courses based on price (price can be FREE)
- search for a course based on course title or subject or instructor
- choose a course from the results and view (but not open) its details including course subtitles, excercises , total hours of each subtitle, total hours of the course and price (including % discount if applicable) according to the country selected
- view a preview video of the course and the course outline before registering for it
- view the most viewed/ most popular courses
- enter their credit card details to pay for a course they want to register for
- pay for a course
- open all the items inside a course he/she is registered for including videos and excercises
- change his/her password
- receive an email to change a forgotten password
- rate an instructor 
- rate a course
- solve a multiple choice exercise by choosing the correct answer
- submit the answers to the exercise after completing it
- view his/her grade from the exercise
- view the questions with the correct solution to view the incorrect answers
- watch a video from a course he/she is registered for
- see his/her progress in the course as a percentage of how much of the course has been completed so far
- receive a certificate as a PDF after completing the course via email
- download the certificate as a PDF from the website
- write notes while watching the video
- download the notes as a PDF
- request a refund only if less than 50% of the course has been attended
- see a list of all the courses he/she is enrolled in on their profile
- report a problem with a course. The problem can be "technical", "financial" or "other"
- see all previously repoted problems and their statuses
- follow up on an unresolved problem
- view the amount available in their wallet from refunded courses

An Admin can

- view reported problems - should automaticalled be marked as "unseen"
- mark reported problems as "resolved" or "pending"
- refund an amount to a trainee to their wallet
- add another administrator with a set username and password
- add instructors and create their usernames and passwords
- add corporate trainees and create their usernames and passwords
- view course requests from corporate trainees
- grant corporate trainees access to specific courses
- set a promotion (% sale) for specific courses, several courses or all courses

## Code Examples

### Frontend 
consists of many pages with different paths, and components are rendered inside pages.
##### To create add a new page, add a new route inside the routes with a specific path and the page that will be rendered when requesting this path
```javascript
import Page from './pages/Page';

function App() {
  return(
       <BrowserRouter>
         <Routes>
           <Route
             path="/"
             element={<Page/>}
           />
          </Routes>
      </BrowserRouter>
}
```
#### Create a page and render component inside it
```javascript
import Component from './Components/Component'
function Page( ) {
 return(
  <div>
   <Component/>
  </div>
  )
}
export default Page
```
Page Example:

```javascript
import { useEffect, useState } from "react";
import axios from "axios";
import {Link ,Navigate,useParams} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import{useNavigate} from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import EditInstructorForm from "../components/EditInstructorForm";
import EditCorporateTraineeForm from "../components/EditCorporateTraineeForm";
import { useAuthContext } from '../hooks/useAuthContext'
import AlertModal from "../components/AlertModal";

    const CorpTraineeEditProfile=()=>{
        
        const { id } = useParams();
        const { user } = useAuthContext();
        console.log("loading course of id: "+id);
        const [corptrainee,setCorpTrainee]=useState({});
        const [oldPassword,setOldPassword]=useState('');
        const [newPassword,setNewPassword]=useState('');
        const [confirmedNewpassword,setConfirmedNewPassword]=useState('');
        const [error,setError]=useState("")
        const [success,setSuccess]=useState("")
        const navigate = useNavigate();
        const [flag,setFlag]=useState(true);
        
  const[showAlert,setShowAlert]=useState(false);
  const [alertMssg,setAlertMssg]=useState("");


    useEffect(() => {

        const fetchCorpTrainee = async () => {
            const response = await axios.get(`/viewCorpTrainee?id=${id}`);
            if (response) {
                setCorpTrainee(response.data.corptrainee);
            }
        };
        fetchCorpTrainee();

    },[id]);
    useEffect(()=> {

    },[error,success,alertMssg])

    const checkOldPassword = async (e) =>{
        e.preventDefault();
        console.log("checkold")
        if (oldPassword!==""){
       const response=  await axios.post(`/checkpassword`,
      { OldPassword: oldPassword,
      DataBasePassword: corptrainee.password});
       console.log(response.data)
       if(!response.data){
           setFlag(false);
            console.log(oldPassword);
            setOldPassword ('');
            setNewPassword('');
            setConfirmedNewPassword('');
            console.log(oldPassword);
            e.preventDefault();
            //alert("old password is incorrect")
            setError("Password entered is incorrect")
            setSuccess("")
           
        }
        else if(response.data){
            setError("")
            setSuccess("")
            setFlag(true)
            compareNewWithConfirmed();
           
          // alert("correct old pass")
        }
    }
    else{
        setSuccess("")
        setError("Please fill all the required fields")
    }
        
    }
    const compareNewWithConfirmed = async()=>{
        if ((newPassword!==confirmedNewpassword) || (newPassword==="" || confirmedNewpassword==="")){
            setError("Passwords enter matching passwords")
            setSuccess("")
            setNewPassword('');
            setConfirmedNewPassword('');
        }
        else{
            try {
             const response=  await axios.patch(`/updatePasswordCorpTrainee?id=${id}`, 
                { password:newPassword })
                if (response) {
                    setSuccess("Password Changed Successfully")
                    setError("")
                    setOldPassword ('');
                    setNewPassword('');
                    setConfirmedNewPassword('');
                }
     
            }catch (err) {
            alert("Couldn't change password");
        
        }
    }
}
    const checkWhenSubmitted =(e)=>{
        e.preventDefault();
        checkOldPassword();
        
        if (flag){
        compareNewWithConfirmed();
        }
        e.preventDefault();
    }
    const handleChange=(e)=>{
        const{name,value}=e.target
        console.log(name+"  "+value);
        setCorpTrainee({...corptrainee, [name]:value});
        console.log(corptrainee);
        
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response=await axios.patch("/updateCorpTrainee", {
                updatedCorpTrainee:corptrainee
            });

            if (response) { 
                setShowAlert(true);
                setAlertMssg("Updated Successfully")
                //window.location.href=`/editCorpTrainee/${id}`
            }

            
          } catch (err) {
            alert("Couldn't edit profile");
          }
        navigate(`/editCorpTrainee/${id}` )
    }

   

        
        return(
            
        <div className="container-xl px-4 mt-4">
            <Tabs style={{backgroundColor:"transparent"}} defaultActiveKey="first">
                <Tab eventKey="first" title="Personal Info">
                    <EditCorporateTraineeForm handleSubmit={handleSubmit} handleChange={handleChange} corptrainee={corptrainee} id={id}/>
                    </Tab>
                    <Tab eventKey="second" title="Security">
         <div className="card my-4">
            <Form className=" mx-auto w-75 p-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
            {success && <div className="error">{success}</div>}
            <Form.Label>Old Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Your Old Password" onChange={(e) => setOldPassword(e.target.value)} 
            value = {oldPassword}/>
                
            </Form.Group>

            <Form.Group className="mb-3" >
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Your New Password" 
            onChange={(e) => setNewPassword(e.target.value)}
            value = {newPassword}/>
            
            </Form.Group>

            <Form.Group className="mb-3" >
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control type="password" placeholder=" Confirm New Password" 
            onChange={(e) => setConfirmedNewPassword(e.target.value)}
            value = {confirmedNewpassword}/>
            
            </Form.Group>
            <div className="d-flex justify-content-end ">
                <Button className="btn btn-primary me-2 "type="submit" onClick ={checkOldPassword}>
                Submit
            </Button>
            </div>
        {error && <div className="error">{error}</div>}
        </Form>
       
        </div>
    </Tab>
                    
    </Tabs>

    <AlertModal show={showAlert} hide={()=>{setShowAlert(false)}} message={alertMssg}/>

    </div>

    

        )
    }

    export default CorpTraineeEditProfile;
```

- All imports in the beginning of the page
- corporate trainee id "id" is taken from params
- fethchCorpTrainee is called in useEffect, so user is fetched from backend on page load
- this page has two tabs, first tab: title="Personal Info", the second: title="Security"
- first tab has EditCorporateTraineeForm component renderend inside it (further explaination later)
- the second tab consists of a form for corporate trainee updating his password
- checkWhenSubmitted called when user submits the form and it calls checkOldPassword 
- checkOldPassword calls backend to fetch the user's old password,compare it with the input password and set flag to true if they are equal and call compareNewWithConfirmed methed , else resets all field and set flag to false and setError("Password entered is incorrect")
- compareNewWithConfirmed checks if the new password entered by user and confirm new passwrod entered by user are equal, if not equal it resets fielda and setError("Passwords enter matching passwords")  else it sends a post request to the backend to update the user's password 
- error is a useState that we changes its value whenever there is ana error and we display it
- AlertModal is a component we use to show messages in modal in different pages, by sending the message we want to show in the props

##### Create a component 
```javascript
function Component( ) {
 return(
  <div>
  </div>
  )
}
export default Component
```

<p>Component Example</p> 

```javascript
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
```
- All methods are passed in the props
- this component return a form that let the user update his profile
- form consists of multiple divs each includes a label and input field, where all input fields has onChange={handleChange} and name is set to the name of the corresponding field in the corporate trainee schema, this helped us to make only one onChange method for all fields
- handleChange in CorpTraineeEditProfile page and passed in props to EditCorporateTraineeForm, updates the field of the user with the name = [name] and sets its value to the value of the input: if the user writes "hey" in input field of name "lastName", the useState of corporateTrainee is updated so that its new lastname = hey
- handleSubmit in CorpTraineeEditProfile page and passed in props to EditCorporateTraineeForm, is called when user submits the form, it calls the backend ot send the new CorporateTrainee to the backend to update its info
    
#### Backend Calls are made in Frontend pages to retrieve data and placed in useEffects in every page to get the needed data from backend on page load 
```javascript
 useEffect(() => {
        const fetchCourses = async () => {
            const response = await axios.get(`/courses`);}
            
       fetchCourses();}
```
to get all courses, use response.data in this case

#### For sending data to the backend:
```javascript
 await axios.post("/addinstructor", {
              username: username,
              password: password,
              name: name,
              email:email
            });
```
### Backend
controller contains all the backend methods that receives and send data to the database
```javascript
const method = async (req,res )=>{}
module.exports={method}
```
server.js file contains all api requests and call the corresponding method
```javascript
app.get("/",controller.method);
app.post("/addinstructor", controller.addinstructor);
```
creating database models
```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const adminstratorSchema = new Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  
  }, { timestamps: true });
const adminstrator = mongoose.model('Adminstrator', adminstratorSchema);
module.exports = adminstrator;
```



## Installation
- Install Visual Studio Code (or any code editor)
- Install Postman for Api testing (optional)
- After downloading the code,open the root of the project in VS code then open 2 terminals
<p>Run the following commands to start the backend in the first terminal:</p>

```sh
cd backend
```
```sh
npm install
```
```sh
nodemon server
```
Run the following commands to start the Frontend in the second terminal:
```sh
cd frontend
```
```sh
npm install
```
```sh
npm start
```

## API Reference

Some examples Api References that retrieve data from backend

### Requests
#### GET
| HTTP Verbs | Endpoints | Action                | Parameters Required |  Response Example | 
| :-------- | :----- | :------------------------- | :------------------- | :------------------------- |
| `GET` | `/courses` | Retrieve all courses | | ![image](https://user-images.githubusercontent.com/42317939/211081647-a8be8838-caa5-4f24-b412-36b0893f93cd.png)|
| `GET` | `/getMostPopular` | Retrieve most popular courses | |![image](https://user-images.githubusercontent.com/42317939/211081845-a856a449-0acf-4787-a70e-4da98bb7124d.png)|
| `GET` | `/instructors?q=${q}` | Retrieve all instructors |name/initials of instructors if preferred as {q} |![image](https://user-images.githubusercontent.com/42317939/211082547-5c43ebf1-be1f-40aa-9b7b-ab087972a67e.png)|
| `GET` | `/instructors` | Retrieve all instructors |name/initials of instructors if preferred as {q} |![image](https://user-images.githubusercontent.com/42317939/211082547-5c43ebf1-be1f-40aa-9b7b-ab087972a67e.png)|
| `GET` | `/price` | Retrieve all prices for all courses | |![image](https://user-images.githubusercontent.com/42317939/211082734-63e9caff-7b20-4f7f-8469-3680b74a885e.png)|
| `GET` | `/instructorCourses/?id=${id} &q=${q}` | Retrieve all courses of instructor with this 'id' that includes the search 'query' in its title or subject| instructor id, name of course if preferred as {id,q}|![image](https://user-images.githubusercontent.com/42317939/211083261-77d31e56-a873-4110-8a32-9738203e7965.png)|
| `GET` | `/subtitles?courseId=${courseId}` | Retrieve all subtitles of a course | Course id as {courseId} in query |![image](https://user-images.githubusercontent.com/42317939/211083892-4aee1e86-7071-47e1-9888-1eeadd799c21.png)|
| `GET` | `/viewRegisteredCourse?id=${id}` | Retrieve a certain course | Course id as {id} in query |![image](https://user-images.githubusercontent.com/42317939/211097414-b05f5fe5-ab43-4178-b213-e9af4dde9bfb.png)|
| `GET` | `/viewInstructor?id=${id}` | Retrieve a certain Instructor | Instructor id as {id} in query |![image](https://user-images.githubusercontent.com/42317939/211097543-554d1a13-0737-44bc-af0c-738b12d582b4.png)|
| `GET` | `/viewCorpTrainee?id=${id}` | Retrieve a certain Corporate Trainee | Coporate Trainee id as {id} in query |![image](https://user-images.githubusercontent.com/42317939/211098147-861cb564-d57d-411a-b9db-927bf2377398.png)|
| `GET` | `/viewTrainee?id=${id}` | Retrieve a certain Trainee | Trainee id as {id} in query |![image](https://user-images.githubusercontent.com/42317939/211098414-729ace2f-b329-4d5e-8e0d-5be6d44301e2.png)|
| `GET` | `/viewCorpTrainees?q=${q}` | Retrieve corporate Trainees with or without name filters | Corporate trainee name or initials as {q} in query |![image](https://user-images.githubusercontent.com/42317939/211098495-57dab25c-a94a-4e7a-b381-eb903a9a9992.png)|
| `GET` | `/viewTrainees?q=${q}` | Retrieve Trainees with or without name filters | Trainee name or initials as {q} in query |![image](https://user-images.githubusercontent.com/42317939/211098796-b2569092-1aac-4f03-b734-4231e2af07ef.png)|
| `GET` | `/getSubtitleExer?id=${id}` | Get all the exercises for a subtitle | Subtitle Id as {id} in query |![image](https://user-images.githubusercontent.com/42317939/211099341-63fa3fe2-9745-4eb3-ae9a-a152e3e3ee92.png)|
| `GET` | `/studentTakesCourse?studentId=${studentId}& courseId=${courseId} &studentType=${studentType}` | Return whether a student is enrolled a certain course | Student Id, course Id, Student type as {studentId, courseId, studentType} in query | ![image](https://user-images.githubusercontent.com/42317939/211099705-8c12f40f-5785-4990-a603-fe6c5b866f06.png)|
| `GET` | `/studentCourses? studentId=${studentId}& studentType={studentType}` | Return all courses a student is enrolled in| Student Id, Student type as {studentId,studentType} in query | ![image](https://user-images.githubusercontent.com/42317939/211100256-78c8eb3e-1e6f-486f-9ed0-40eb75902fe9.png)|
| `GET` | `/search?q=${query}` | Retrieve all courses that includes the search 'query' in its title, subject |search words as {query} passed in query body|![image](https://user-images.githubusercontent.com/42317939/211100535-d1cf6b78-4a51-41b4-9e5c-74d4815cf510.png)|
#### POST & PATCH
| HTTP Verbs |Endpoints| Action |Request body |Parameters Required | 
| :-------- | :--| :--------------------- | :------------------------------ | :--------- |
| `POST` | `/addcourse`| creates new course and sends course info in the request body |![image](https://user-images.githubusercontent.com/42317939/211085407-dd06e233-c1d9-4199-9475-7e21c079ee9d.png)|{ title: title, price:price, instructor:id, summary:summary, subject:subject, video:video } |
| `POST` | `/addadmin`| creates new admin and sends login info in the request body | ![image](https://user-images.githubusercontent.com/42317939/211087538-3b7f406a-06b4-4f99-9188-9c115e6e8d1f.png)|{username,password}  are passed in the request body|
| `POST` | `/addinstructor`| creates new insructor and sends instuctor info in the request body |![image](https://user-images.githubusercontent.com/42317939/211088030-5b269aba-80b4-4a5c-9e74-edfc01a8963a.png)| {username, password,name}  are passed in the request body|
| `POST` | `/addcorporatetrainee`| creates new corporate trainee and sends login info in the request body | ![image](https://user-images.githubusercontent.com/42317939/211088409-19c8854c-430b-4e03-bc96-2d29d335bf07.png)|{username, password} are passed in the request body|
| `POST` | `/addSubtitle`| creates new subtitle in one of the exercises and sends its info in the request body |![image](https://user-images.githubusercontent.com/42317939/211088774-d9926c4c-933a-476d-a5aa-4cf01b64090c.png)| {title,video,description,course,duration,exercises} are passed in the request body|
| `POST` | `/addCourseReview?id=${id}` | adds a new review about one of the curses and sends it in the request body |![image](https://user-images.githubusercontent.com/42317939/211092948-8fddfa69-33bc-435a-99a5-7b3eb7725a6d.png)|{comment,stars, author} are passed in the request body & course id is passed in the query|
| `POST` | `/requestAccess`| request access for a certain course and sends it in the request body |![image](https://user-images.githubusercontent.com/42317939/211089383-44ff1511-d104-4e05-b368-ff4406c162da.png)|{studentId, courseId} are passed in the request body|
| `PATCH` | `/addNote?studentId =${studentId}& courseId=${courseId}& studentType=${studentType}`| adds a note while watching a video and sends it in the request body |![image](https://user-images.githubusercontent.com/42317939/211093657-42bc44be-c0d7-41cb-b657-2c3bbcd9be8f.png)| {notetime,note ,videoid} are passed in the request body & {studentId, courseId, studentType} are passed in the query|
| `PATCH` | `/updatePassword Instructor?id=${id}`| updates instructor password with this 'id' and sends the new password in the request body  |![image](https://user-images.githubusercontent.com/42317939/211093819-601c45be-a399-4110-9f21-c782165e3d56.png)|{password} is passed in the request body & Instructor id as {id} is passed in the query|
##### Post Requests body example

```javascript
"/addcourse", {
        title: title,
        price:price,
        instructor:id,
        summary:summary,
        subject:subject,
        video:video }
```
this will create a course with all the course info required
### Responses
All Api responses are JSON objects of the following format
```javascript
{"message": String,
 "status" : Number,
  "statusText": String,
   "data": String
}
```

## Tests
## Api tests using Postman
choose request type (POST, GET or PATCH) and enter request URL

4000 is the port number included in .env file
### Test 1
```
localhost:4000/courses
```
##### Response
![image](https://user-images.githubusercontent.com/42317939/211104643-57770cd6-03f6-445a-a6a8-85b088ae9b71.png)

### Test 2
```
http://localhost:4000/search?q=java
```
##### Response
![image](https://user-images.githubusercontent.com/42317939/211104880-a0a0e017-9b3d-4388-a2ec-8a2a96d742d5.png)

### Test 3
```
 http://localhost:4000/addNote?studentId=63b40e3643ac435aabf1454c&courseId=636000d5f8610b862dc0dd11&studentType=individualTrainee
```
##### Response
![image](https://user-images.githubusercontent.com/42317939/211105532-4d1a674a-5271-4964-979c-bc6a400ab27a.png)



## How To Use
 - generate a token https://jwt.io/
 - create .env file inside the backend folder in VS code 
 - Include inside the env file your backend port number, your Mongoose collection url, JW secret, your email and password
 ```
PORT=4000
MONGO_URI=
JWT_SECRET=
USER=
PASS=
```
 - Run project as mentioned in the installation part
 - open browser
 - Enter the following URL: http://localhost:3000/ and you will be directed to the homepage as a guest 
 #### To be able to add admin, courses, instructors and corporate trainees:
- Head to your mongoose collections and manually create an admin in adminstrators schema (username and password fields)
- back to the website, login with the new admin info
- now The admin can create Instructors, Corporate Trainees and other admins 
- after creating an instructor, login as an instructor
- As an instructor , i can create new courses add modules and videos. I can edit everything in the unpublished course and publish it afterwards, I can also add promotions,close/open my courses and check any other courses by any instructors. An instructor can edit his profile including his/her bio,change his/her password and view earnings from all courses in his/her wallet and view ratings and reviews given by the enrolled students
- As a guest , i can check the most popular courses and discover all the courses presented when clicking on discover courses, search and filter either by price or rating or subject yet i can not be enrolled until i sign up as a trainee.
- As a trainee, i can login using my credientials that are saved in the database , i can view all courses and the most popular ones, i can click on any course i want and enroll in it , i can pay with my credit card after being redirected to "/payments/" page. I can also visit all my enrolled courses by clicking on **My Learning** tab in the navigation bar , to check my progress , issue a report or requesting a refund. There is an option to edit anything in my profile and add any review for an instructor or a course.
- As an admin, i can check all the reports issued and either mark them as resolved or mark them as pending providing reasons , accept or decline the refund requests and refund the amount to the trainee's wallet. Also , i can add another admin providing him with a username and password and also set any promotion for any course(s)


## Contribute
Unfortunately, our time was very limited that we couldn't provide additional features. So here are some features that may be added:

- An Individual Trainee or a Corporate Trainee can see all his/her grades for exercises (or exams) he/she did previously
- An Individual Trainee or a Corporate Trainee 2% can retake an exercise (or exam) if he/she failed it BEFORE viewing the
answers to the exam/ exercise
- An Instructor can see the average mark scored on the exercises/ exams in his/her
course
- An Instructor can see the total number of students enrolled in his/her course
- An Individual Trainee or a Corporate Trainee can edit or delete his/her review of an instrcutor or a course.
- An Individual Trainee or a Corporate Trainee can ask the course instructor questions about his/ her course AFTER
registering for it
- An Instructor can view the questions asked by the trainees and answer them
- An Individual Trainee or a Corporate Trainee can view the replies of instructors to his/her questions


## Code Contributors
This project exists thanks to all the people who contributed. 
<p>
 - Yasmine ElSerafy
 - Hana Mohamed
 - Nada Hegazy
 - Salma Ihab
 - Farida Tarek
</p>
Even though it is not perfect , it is a promising result after the efforts that had been put into it.


## Credits
- Credits goes to **Ms Noha Hamid** & **Ms Nada Abdel-Fattah** & **Ms Hadwa Pasha** for helping us throughout the project and for their feedbacks
- Credits goes to **https://www.youtube.com/watch?v=98BzS5Oz5E4&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&index=1** which got us introduced to all aspects of the project and The Net Ninja channel on youtube in general
- Credits goes to **://medium.com/@joe.broder15/adding-credit-card-payments-to-your-mern-app-65af7a9a0e0** for writing this article that really helped us create our payment system and introduced us to stripe functionalities

## License
-German University in Cairo

-Apache License 2.0 for Stripe CLI

-MIT License
