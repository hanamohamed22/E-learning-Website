import {useState} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from "./pages/Home";
import InstructorNavbar from './components/InstructorNavbar';
import TraineeNavbar from './components/TraineeNavbar';
import Admin from './pages/Admin';
import Instructor from './pages/Instructor';
import Corporatetrainee from './pages/Corporatetrainee';
import SubtitleForm from './components/SubtitleForm';
import RegisteredCourse from  './pages/RegisteredCourse';
import CourseInfo from './pages/CourseInfo';
import InstructorProfile from './pages/InstructorProfile';
import InstructorEditProfile from './pages/InstructorEditProfile';
import InstructorViewCourse from './pages/InstructorViewCourse';
import AdminViewCourses from './pages/AdminViewCourses';
import AdminViewInstructors from './pages/AdminViewInstructors';
import Quiz from './components/Quiz';
import AnsweredQuiz from './components/AnsweredQuiz';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Pagination from './pages/Pagination'; 
import CorpTraineeEditProfile from './pages/CorpTraineeEditProfile';
import Trainee from './pages/Trainee';
import TraineeEditProfile from './pages/TraineeEditProfile';
import TraineeWallet from './pages/TraineeWallet';
import Certificate from './pages/Certificate';
import MyLearning from './pages/MyLearning';
import AdminViewStudents from './pages/AdminViewStudents';
import PaymentComponent from './components/PaymentComponent';
import Singup from './pages/Signup';
import Navbar from './components/Navbar';
import InstructorViewPublished from './pages/InstructorViewPublished';
import ReportsPage from './pages/ReportsPage';
import Welcome from './pages/Welcome';


import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from 'react';
import { useAuthContext } from './hooks/useAuthContext'
import InstructorWallet from './pages/InstructorWallet';


function App() {
  const { user } = useAuthContext()
  const [country,setCountry]=useState('EGP');
  const getcountry = (data) => {
    setCountry(data); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
  }
  const [userId,setUserId]=useState("");
  //const [user,setUser]=useState(3); // 1:admin 2:instructor 3:indivTrainee 4:corpTrainee
  // const getUser = (data) => {
  //   setUser(data); 
  // } //will call it in login inshallah
 //pass user id to navbar //638cbd05b6e568db74b37511
  // const getUserId = (data) => {
  //   setUser(data); 
  // }//ahsan neb2a ne pass el user kolo fel props
  // const setUserId = (userId) => {
  //   this.setUserId(userId);
  // }
  const handleCallback = (childData) =>{
    this.setUserId(childData)
    console.log(childData)
}
console.log("app.js")
//console.log(userId)

  return (
    <div className="App">
      <BrowserRouter>
      <div>
      {user && user.message==="instructor"? <InstructorNavbar country={getcountry} userId={userId}/>:<div>{(!user || user.message==="admin")?<Navbar></Navbar> :<TraineeNavbar country={getcountry} user={user}/>}</div>}
      {/* <Login parentCallback = {this.handleCallback}/> */}
        {/* {user.message==="instructor"?<InstructorNavbar country={getcountry} userId={userId}/>:<TraineeNavbar country={getcountry} user={user}/> } */}
      </div>
      <div className='pages m-3'>
        <Routes>
          <Route
            path="/"
            element={<Welcome con={country}/>}
          />
          <Route
            path="/home"
            element={<Home con={country}/>}
          />
          <Route
            path="/home/:q"
            element={<Home con={country}/>}
          />
           <Route
            path="/trainee"
            element={user && user.message==="individualTrainee"?<Trainee con={country}  userId={userId}/>: <Welcome con={country}/>}
          />
          <Route 
          path="/1"
          element={user && user.message==="admin"?<Admin />: <Login/>}
          />
          <Route 
          path="/2"
          element={user && user.message==="instructor"?<Instructor con={country}/>: <Welcome con={country}/>} //instructor views his courses
          />
          <Route 
          path="/corporatetrainee"
          element={user && user.message==="corporateTrainee"?<Corporatetrainee con={country}/>: <Welcome con={country}/>}
          />
          <Route 
          path="/sub"
          element={user?<SubtitleForm />: <Login/>}
          />
          <Route 
          path="/myCourse/:courseId"
          element={user?<RegisteredCourse/>: <Login/>} //video el course
          />
           <Route 
          path="/certificate/:studentId/:courseId"
          element={user?<Certificate/>: <Login/>}
          />
          <Route 
          path="/course/:id"
          element={<CourseInfo con={country}/>} //course that I am not registered for
          />
          <Route 
          path="/course"
          element={<CourseInfo con={country}/>}
          />

          <Route 
          path="/instructorProfile/:id"
          element={<InstructorProfile/>} 
          />
          
          <Route 
          path="/editInstructor/:id"
          element={user && user.message==="instructor"?<InstructorEditProfile/>:<Welcome con={country}/>}
          />
          <Route 
          path="/editCorpTrainee/:id"
          element={user && user.message==="corporateTrainee"?<CorpTraineeEditProfile/>:<Welcome con={country}/>}
          />
          <Route 
          path="/editTrainee/:id"
          element={user && user.message==="individualTrainee"?<TraineeEditProfile/>:<Welcome con={country}/>}
          />
          
          <Route
          path="/traineeWallet"
          element={user && user.message==="individualTrainee"?<TraineeWallet/>:<Welcome con={country}/>}
          />
          <Route 
          path="/editInstructor"
          element={user && user.message==="instructor"?<InstructorEditProfile/>:<Welcome con={country}/>}
          />

          <Route 
          path="/instructorViewCourse/:id"
          element={user && user.message==="instructor"?<InstructorViewCourse con={country}/>:<Welcome con={country}/>}
          />
          <Route 
          path="/InstructorViewPublished/:id"
          element={<InstructorViewPublished con={country}/>}
          />
          
          <Route 
          path="/AdminViewCourses"
          element={user && user.message==="admin"?<AdminViewCourses con={country}/>:<Welcome con={country}/>}
          />
          <Route
          path="/AdminViewInstructors"
          element={user && user.message==="admin"?<AdminViewInstructors />:<Welcome con={country}/>}
          />
          <Route
          path="/AdminViewStudents"
          element={user && user.message==="admin"?<AdminViewStudents />:<Welcome con={country}/>}
          />
         <Route 
          path="/quiz"
          element={user?<AnsweredQuiz />:<Welcome con={country}/>}
          />
         
          <Route
          path="/forgotpassword"
          element={<ForgotPassword/>}
          />
          <Route
          path="/resetpassword/:id/:token"
          element={<ResetPassword/>}
          />
          <Route
          path="/4"
          element={<Pagination/>}
          />
          <Route
          path="/myLearning"
          element={user?<MyLearning/>:<Welcome con={country}/>}
          />
          <Route path="/payments/:id"
element={user?<PaymentComponent
  keys={{
      stripe: "pk_test_51MCZ20ApbKsLTTdCsPhFjQr5lXjz3eADNoJug2wLh8arflA0i5oqhFE7CEkcw0ODrxEgU2aQNeXvu7gBM4ljAHoP00PRxU1feH",
  }}
/>:<Login/>}
/>
<Route    path="/signup"
          element={<Singup />}
          />
           <Route 
          path="/login"
          element={<Login  />}
          // element={<Login  setTheUser = {user=>setUser(user)}  setTheId ={userId=>setUserId(userId)}/>}
          />
        <Route
          path="/instructorwallet"
          element={user && user.message==="instructor"?<InstructorWallet/>:<Welcome con={country}/>}
          />
          <Route
          path="/ReportsPage/:id"
          element={<ReportsPage/>}
          />


      
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
