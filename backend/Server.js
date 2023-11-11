// External variables
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const course = require('./Models/Course');
const instructor = require('./Models/Instructor');
const subtitle = require('./Models/Subtitle');
const takes=require('./Models/Takes');
const cookieParser = require('cookie-parser');

//App variables
var cors = require('cors')


const app = express();
const port = process.env.PORT;
// #Importing the Controller
const controller=require('./Routes/Controller');
app.use(cors())

// configurations
// Mongo DB
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("MongoDB is now connected!")

// Starting server
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));



app.get("/home",controller.viewCourses);
app.get("/courses",controller.viewCourses);
app.get("/getMostPopular",controller.getMostPopular);
app.get("/instructors",controller.viewInstructors);
app.get("/price",controller.viewPrice);
app.get("/instructorCourses",controller.instructorCourses);
app.get("/subtitles",controller.viewSubtitles)
app.get("/viewRegisteredCourse",controller.viewRegisteredCourse);
app.get("/viewInstructor",controller.viewInstructor);
app.get("/viewCorpTrainee",controller.viewCorpTrainee);
app.get("/viewTrainee",controller.viewTrainee);
app.get("/viewCorpTrainees",controller.viewCorpTrainees);
app.get("/viewTrainees",controller.viewTrainees);
app.get("/getSubtitleExer",controller.getSubtitleExer);
app.get("/studentTakesCourse",controller.studentTakesCourse);
app.get("/studentCourses",controller.studentCourses);


//app.get("/getSubtitleExer/:id",controller.getSubtitleExer);

// #Routing to userController here
app.use(express.json()); //3ashan tehoti el data el gayalek ay request f req.body
app.get("/filter",controller.filter);
app.get("/filterprice",controller.filterprice);


//adding
app.post("/addcourse", controller.addcourse);
app.post("/addadmin",controller.addadmin);
app.post("/addinstructor", controller.addinstructor);
app.post("/addcorporatetrainee",controller.addcorporatetrainee);
app.post("/addSubtitle",controller.addSubtitle);
app.post("/addCourseReview",controller.addCourseReview);
app.post("/addInstructorReview",controller.addinstructorReview);
app.post("/addCourseVideo",controller.addCourseVideo);
app.post("/addCoursePromo",controller.addCoursePromo);
app.post("/addSubject",controller.addSubject);
app.post("/deleteSubject",controller.deleteSubject);

app.patch("/updateCourse",controller.updateCourse)
app.patch("/updateInstruc+tor",controller.updateInstructor)
app.patch("/updateCorpTrainee",controller.updateCorpTrainee)
app.patch("/updateTrainee",controller.updateTrainee)
app.patch("/addNote",controller.addNote)
app.patch("/editNote",controller.editNote)
app.patch("/deleteNote",controller.deleteNote)
app.post("/addSubtitleExer", controller.addSubtitleExer)
app.post("/addSubtitleVideo", controller.addSubtitleVideo);
app.post("/requestRefund",controller.requestRefund);
app.post("/requestAccess",controller.requestAccess);
app.post("/addWatchedVideo",controller.addWatchedVideo);
app.post("/addCertificate",controller.addCertificate);
app.post("/addSolvedExercise",controller.addSolvedExercise);
app.post("/acceptAccessRequest",controller.acceptAccessRequest);
app.post("/acceptRefundRequest",controller.acceptRefundRequest);
app.patch("/rejectAccessRequest",controller.rejectAccessRequest);
app.patch("/rejectRefundRequest",controller.rejectRefundRequest);
app.patch("/updatePromotion",controller.updatePromotion);







//search
app.get("/search",controller.searchCourses);
app.get("/findsubjects",controller.findSubjects);
app.get("/findprices",controller.findPrices);
app.post("/forgotpassword",controller.forgotpassword);
app.get("/getNotes",controller.getNotes);
app.get("/getRefundRequests",controller.refundRequests);
app.get("/getAccessRequests",controller.accessRequests);
app.get("/getStudentAccessRequests",controller.studentAccessRequests);
app.get("/traineeRefundRequests",controller.traineeRefundRequests);
app.get("/resetpassword/:id/:token",controller.verifyurl);
app.post("/resetpassword",controller.resetpassword);
app.patch("/updatePasswordInstructor",controller.updateInstructorsPassword);
app.patch("/updatePasswordCorpTrainee",controller.updatePasswordCorpTrainee);
app.patch("/updatePasswordTrainee",controller.updatePasswordTrainee);
app.post('/mailsender',controller.sendmail)
app.post('/deletesubtitles',controller.DeleteSubtitles)
//payment
app.post("/stripe",controller.paymentrequest);
//app.post("/stripe",requireAuth,controller.paymentrequest);
app.post('/confirm-payment',controller.confirmpayment);
app.post('/confirm-takes',controller.AddIndividualTraineeTocourseAfterPayment);
app.post('/PayfromWallet',controller.PayfromBalance);
//app.post('/confirm-payment',requireAuth,controller.confirmpayment);
//LOGIN
app.post("/signup", controller.signUp);
app.post('/login', controller.login);
app.get('/logout', controller.logout);
app.post('/checkpassword',controller.checkPassword)
app.post("/instructorFirstLogin", controller.instructorFirstLogin);
app.post("/corpFirstLogin", controller.corpFirstLogin);
app.post("/instructorPublishCourse", controller.instructorPublishCourse);
app.post("/instructorCloseCourse", controller.instructorCloseCourse);

//instructorpayment
app.get('/instructorpayment', controller.InstructorPayment);
app.get('/numberofstudents', controller.NumberofStudentsPerCourse);

//reports
app.patch("/pendingReport",controller.pendingReport);
app.patch("/resolvingReport",controller.resolvingReport);
app.patch("/adminSeenReports",controller.adminSeenReports);
app.patch("/insertingFollowUp",controller.insertingFollowUp);
app.post("/instructorReporting", controller.instructorReporting);
app.post("/individualTraineeReporting",controller.individualTraineeReporting);
app.post("/corporateTraineeReporting",controller.corporateTraineeReporting);
app.get("/adminViewReports", controller.adminViewReports);
app.get("/individualviewReports",controller.individualviewReports)
app.get("/instructorviewReports",controller.instructorviewReports)
app.get("/corpviewReports",controller.corpviewReports)
