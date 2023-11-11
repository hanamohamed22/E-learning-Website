// #Task route solutioneCou
require('dotenv').config();
const mongoose = require('mongoose');
const courses = require('../Models/Course');
const instructor = require('../Models/Instructor');
const adminstrator = require('../Models/Adminstrator');
const corporatetrainee=require('../Models/CorporateTrainee');
const individualtrainee =require('../Models/IndividualTrainee');
const subtitle = require('../Models/Subtitle');
const takes =require('../Models/Takes');
const refundRequest=require('../Models/RefundRequest');
const accessRequest=require('../Models/AccessRequest');
const report = require('../Models/Reports');
const subjects=require('../Models/Subjects')

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const sendEmail=require("../Email/sendEmail");
const { request } = require('express');
const { findByIdAndDelete } = require('../Models/Subjects');
const stripe = require('stripe')('sk_test_51MCZ20ApbKsLTTdChANSYw4muAoIjNf2nRAE7RnNTa1fzqeFNfUhMJwP2elMafSqSQqNIxOc874n88gTXQV2yGGZ00M9x9xQ1v');

const instructorCourses = async (req,res )=>{
  const userId = req.query.id;
  const q = req.query.q;

  if(userId){
  const x = await courses.find({instructor:mongoose.Types.ObjectId(userId)}).populate('instructor');
  const result=x.filter((course)=>course.title.toLowerCase().includes(q)
    ||course.subject.toLowerCase().includes(q));

  res.status(200).json(result)
  }else{
      res.status(400).json({error:"userId is required"})
  }
}

const searchCourses= async (req,res )=>{
  try{
    const {q} = req.query;
    const course= await courses.find({published:true,closed:false}).populate('instructor');
    const x=course.filter((course)=>{return(course.title.toLowerCase().includes(q)
    ||course.subject.toLowerCase().includes(q)||course.instructor.name.toLowerCase().includes(q))});
    res.status(200).json(x);
}
catch{

  res.send("sorryyyy");
} 
}

const viewCourses = async (req,res )=>{
    try{
      const course= await courses.find({published:true,closed:false}).populate('instructor');
      // const y = await courses.findOne().populate('instructor');
      // console.log(y.instructor.username);
      //to get the instructor of a course;; 
      res.status(200).json( course );
}
catch{
    res.send("sorryyyy");
} 
}
const viewInstructors = async (req,res )=>{
  try{
    const {q} = req.query;
    const instructors= await instructor.find();
    const x=instructors.filter((instructor)=>{return(instructor.name.toLowerCase().includes(q)
    ||instructor.username.toLowerCase().includes(q))});
    res.status(200).json(x);
}
catch{

  res.send("sorryyyy");
} 
}
const viewSubtitles=async(req,res)=>{
  const {courseId} = req.query;

  if(courseId){
    try{
      const subtitles = await subtitle.find({course:mongoose.Types.ObjectId(courseId)}).populate('course');
      res.status(200).json( subtitles );}
    catch{
      res.send("sorryyyy");
    } 
}
  else{
    res.status(400).json({error:"courseId is required"})

  }}
const viewPrice = async (req,res )=> {
    try {
        res.status(200).json (await courses.find({published:true,closed:false}).select({"price":1 , "_id":0 }))
    }
    catch {
        res.send("unavailable ");
    }
}

const studentTakesCourse = async (req,res )=>{
  const {studentId,courseId,studentType} = req.query;
  var result={};
  if(studentType==="corporateTrainee"){
  result=await takes.findOne({corporateTrainee:mongoose.Types.ObjectId(studentId),course:courseId}).populate('corporateTrainee');
}
  else
  if(studentType==="individualTrainee"){
  result = await takes.findOne({individualTrainee:mongoose.Types.ObjectId(studentId),course:courseId}).populate('individualTrainee');}
  res.status(200).json(result) 
}
const studentCourses = async (req,res )=>{
  const {studentId,studentType} = req.query;
  var result={};
  if(studentType==="corporateTrainee")
  result=await takes.find({corporateTrainee:mongoose.Types.ObjectId(studentId)}).populate('course');
  else
  if(studentType==="individualTrainee"){
  result = await takes.find({individualTrainee:mongoose.Types.ObjectId(studentId)}).populate('course');}
    console.log(result);
  res.status(200).json(result) 
}

const getMostPopular = async (req,res )=>{
   try{
      topIds=await takes.aggregate([{$group : {_id : "$course", "count" : {$sum : 1}}},{$sort : {"count" : -1}},{$limit : 10}]);//returns array of ids and count of top 5 most popular 
      ids=topIds.map((x)=>{return x._id}); //top 5 ids
      const result = await courses.find({ '_id': { $in: ids } ,published:true,closed:false}).populate('instructor'); //top 5 courses
      // console.log(ids)
      // console.log(result);
      res.status(200).json(result)}
   catch {
      res.status(400).json({error:"couldn't find most popular"})
    }
    
}
const requestRefund = async (req,res )=>{
  const {studentId,courseId,comment,value} = req.body;
  var result={};
  result=await refundRequest.create({individualTrainee:studentId,course:courseId,comment:comment,value});

  res.status(200).json(result)

}
const requestAccess = async (req,res )=>{
  const {studentId,courseId} = req.body;
  var result={};
  result=await accessRequest.create({corporateTrainee:studentId,course:courseId});

  res.status(200).json(result)

}
const studentAccessRequests = async (req,res )=>{
  const {studentId,courseId} = req.query;
  res.status(200).json(await accessRequest.find({"corporateTrainee":studentId,"course":courseId}))

}
const accessRequests = async (req,res )=>{

  res.status(200).json(await accessRequest.find().populate('corporateTrainee').populate('course'))

}
const refundRequests = async (req,res )=>{
  
  res.status(200).json(await refundRequest.find({state:"pending"}).populate('individualTrainee').populate('course'))

}
const traineeRefundRequests = async (req,res )=>{

  const traineeId=req.query.traineeId;
  res.status(200).json(await refundRequest.find({individualTrainee:traineeId}).populate('course'))

}

const acceptAccessRequest = async (req,res )=>{
  const {request} = req.body;
  studentId=request.corporateTrainee;courseId=request.course;requestId=request._id;
  await takes.create({corporateTrainee:studentId,course:courseId});
  result=await accessRequest.findByIdAndDelete(requestId);
  res.status(200).json (result);
}
const rejectAccessRequest = async (req,res )=>{
  const {request} = req.body;
  requestId=request._id;
  result=await accessRequest.findByIdAndDelete(requestId);
  res.status(200).json (result);

}
const acceptRefundRequest = async (req,res )=>{
  const {request} = req.body;
  studentId=request.individualTrainee;
  courseId=request.course;requestId=request._id;
  updatedRequest=await refundRequest.findByIdAndUpdate(requestId,{$set : {state : "accepted"}}).populate('course');
  await takes.findOneAndDelete({individualTrainee:studentId,course:courseId});
  await individualtrainee.findByIdAndUpdate(studentId,{$inc : {balance :request.value }});

  const myCourse=await courses.findById(courseId).populate('instructor');
   const myInstructor=myCourse.instructor._id;
  await instructor.findByIdAndUpdate(myInstructor,{$inc : {balance :-request.value }});
  res.status(200).json (updatedRequest);
  

}
const rejectRefundRequest = async (req,res )=>{
  const {request} = req.body;
  requestId=request._id;
  result=await refundRequest.findByIdAndUpdate(requestId,{$set : {state : "rejected"}}).populate('course');
  res.status(200).json (result);
}


const filter = async (req , res)=>{
try{
    async(req,res)=>{
        const {subject,rating}=req.body;
        if(rating===null){
          res.status(200).json (await courses.find({"subject":subject,published:true,closed:false}));
        }
        if(subject===null){
          res.status(200).json (await courses.find({"rating":rating,published:true,closed:false}));
        }
        res.status(200).json (await courses.find({"subject":subject , "rating":rating ,published:true,closed:false}));
      }
}
 catch {
    res.send("unavailable ");
 }
}
const filterprice=async(req,res)=>{
    const {price}=req.body;
    res.status(200).json (await courses.find({"price":price}));
}
const viewRegisteredCourse=async(req,res)=>{

  const id=req.query.id;
  try{res.status(200).json (await courses.findById(id).populate('instructor'));}
  catch{res.status(400).json({error:"couldn't fetch course"})}
  
}
const viewInstructor=async(req,res)=>{
  
  const id=req.query.id;

  try{
    const instruc=await instructor.findById(id);
    const crs = await courses.find({instructor:mongoose.Types.ObjectId(id),published:true,closed:false}).populate('instructor');
    res.status(200).json ({courses:crs, instructor:instruc});
  }

  catch{
    res.status(400).json({error:"couldn't fetch instructor"})}

}
const viewCorpTrainee=async(req,res)=>{
  
  const id=req.query.id;

  try{
    const corptrainee=await corporatetrainee.findById(id);
    //const crs = await courses.find({instructor:mongoose.Types.ObjectId(id)}).populate('instructor');
    res.status(200).json ({corptrainee:corptrainee});
  }

  catch{
    res.status(400).json({error:"couldn't fetch corptrainee"})}

}
const viewCorpTrainees=async(req,res)=>{
  try{
    const {q} = req.query;
    const corpTrainees= await corporatetrainee.find();
    const x=corpTrainees.filter((corp)=>{return(corp.username.toLowerCase().includes(q))});
    res.status(200).json(x);}
  catch{
    res.status(400).json({error:"couldn't fetch CorpTrainees"})}

}
const viewTrainee=async(req,res)=>{
  const id=req.query.id;

  try{
    const trainee=await individualtrainee.findById(id);
    //const crs = await courses.find({instructor:mongoose.Types.ObjectId(id)}).populate('instructor');
    // console.log(trainee);
    res.status(200).json ({trainee:trainee});
    
  }

  catch{
    res.status(400).json({error:"couldn't fetch trainee"})}

}
const viewTrainees=async(req,res)=>{
  try{
    const {q} = req.query;
    const trainees= await individualtrainee.find();
    const x=trainees.filter((t)=>{return(t.username.toLowerCase().includes(q)||t.firstname.toLowerCase().includes(q)||t.lastname.toLowerCase().includes(q))});
    res.status(200).json(x);}
  catch{
    res.status(400).json({error:"couldn't fetch individualTrainees"})}

}

//adding
const addinstructor=async(req,res)=>{
    const {username,password,name,email}=req.body;
    await instructor.create({username,password,name,email});
    res.status(200).json(await instructor.find({}));
}
const addcourse=async(req,res)=>{
  console.log("Adding course")
    const {title,subject,price,instructor,summary,video}=req.body;
    try{
     await courses.create({title,subject,price,instructor,summary,video});
      //await instructor.findOneAndUpdate({courses:courses.push()})
      //const coursewanted= await courses.findOne({instructor:mongoose.Types.ObjectId(instructor)}).populate('instructor').sort({createdAt:-1});
      const coursewanted=await courses.findOne({instructor}).sort({createdAt:-1});
      console.log(coursewanted)
      res.status(200).json(coursewanted);
    }
    catch{
      res.status(400).json({error:"couldn't add course"})
    }
    
  }

const getlastaddedcourse=async(req,res)=>{
}

const addadmin= async(req,res)=>{
    const {username,password}=req.body;
    const salt = await bcrypt.genSalt();//bycrypt di library-- salt da dummy data ba add it bastkhdm salt to avoid easy hacking
    const hashedPassword = await bcrypt.hash(password, salt); 
    await adminstrator.create({username,password:hashedPassword});
    res.status(200).json (await adminstrator.find({}));
  }
  const addSubtitle=async(req,res)=>{
   // await subtitle.deleteMany();
    const {title,video,description,course,duration,exercises}=req.body;
    console.log(req.body);
    hours=duration
    try{
     if (title!=="" && video.videoURL!=="" && description!=="" && course!=="" && duration!==0 ){
     await subtitle.create({title,videos:video,description,course,hours,exercises});
      await courses.findByIdAndUpdate(course,{ $inc: { totalHours: duration} })
    //console.log(await subtitle.find({}));
    res.status(200).json (await subtitle.find({}));
    }
  }
    catch{
      res.status(400).json({error:"couldn't add subtitle"})
    }
  }
  const addcorporatetrainee= async(req,res)=>{
    const {username,password,email,firstname,lastname,corporate}=req.body;
    await corporatetrainee.create({username,password,email,firstname,lastname,corporate});
    res.status(200).json (await corporatetrainee.find({}));
  }
  
  const addCourseReview=async(req,res)=>{
    
    const id=req.query.id;
    const review=req.body;
    const stars=req.body.stars;
    const result=await courses.findByIdAndUpdate(id,{$push:{reviews: review}});
    await courses.findByIdAndUpdate(id,
      [{$set : {avgRating : {$avg : "$reviews.stars"}}} ]
   )
    res.status(200).json (result);
}

const addCoursePromo=async(req,res)=>{
  
  const ids=req.body.ids; //courses ids
  const promo=req.body.promo;
  const admin=req.body.admin;

  for(let i=0 ; i<ids.length ; i++){
    if(ids[i]!=null){
      const course=await courses.findByIdAndUpdate(ids[i],{$set : {promotion : promo, admin:admin}},{new: true});

      if(!(typeof course.promotion === 'undefined')){ 
        start=course.promotion.startDate;
        end=course.promotion.endDate;
        today = new Date()
      if(start<=today && end>=today){
        await courses.findByIdAndUpdate(course._id,{$set : {'promotion.valid' : 1}});
      }
      else{
        if(start>today && end>today)
        await courses.findByIdAndUpdate(course._id,{$set : {'promotion.valid' : 2}}); //upcoming
        else
        await courses.findByIdAndUpdate(course._id,{$set : {'promotion.valid' : 0}});

      }
    
    
    }}
  }

  const result=await courses.find({});
  res.status(200).json (result);
}
const addCourseVideo=async(req,res)=>{
  const id=req.query.id;
  const {video}=req.body;
  //console.log("vid: "+video)
  const result=await courses.findByIdAndUpdate(id,{video:video});
  res.status(200).json (result);
}

const addinstructorReview =async(req,res)=>{
  const id=req.query.id;
  const review=req.body;
  console.log(id);
  console.log(review);
  const result=await instructor.findByIdAndUpdate(id,{$push:{reviews: review}});
  await instructor.findByIdAndUpdate(id,
    [{$set : {avgRating : {$avg : "$reviews.stars"}}} ]);
  res.status(200).json (result);

}


const updateInstructor=async(req,res)=>{
  const {updatedInstructor}=req.body;
  try{
    res.status(200).json(await instructor.findByIdAndUpdate(updatedInstructor._id,{
    username:updatedInstructor.username,
    name:updatedInstructor.name,
    bio:updatedInstructor.bio,
    email:updatedInstructor.email}));}
  catch{
    res.status(400).json({error:"couldn't update info"})

  }
}
//   const findSubjects = async(req,res) => {
//     res.status(200).json  ( await courses.find({published:true,closed:false}).distinct("subject"));
    
// }

const addSubject=async(req,res) => {
  res.status(200).json  ( await subjects.create({subject: req.body.newSubject})); 
}

const deleteSubject=async(req,res) => {
  res.status(200).json  ( await subjects.findByIdAndDelete(req.query.id)); 
}
const findSubjects = async(req,res) => {
  res.status(200).json  ( await subjects.find({}));
  
}
const findPrices = async(req,res) => {
  res.status(200).json  ( await courses.find({published:true,closed:false}).distinct("price"));
  
}
const addSubtitleExer=async(req,res)=>{
  console.log(req.query)
  const id=req.query.id;
 // console.log("id"+id)
 const exercise=req.body;
   const subb=subtitle.findById(id); 
 const result=await subtitle.findByIdAndUpdate(id,{$push:{exercises: exercise}});
  console.log("hana");
  console.log(result)
  res.status(200).json(result);
}
const addSubtitleVideo=async(req,res)=>{
  const id=req.query.id;
  const {subvideo}=req.body;
  //await subtitle.findByIdAndUpdate(id,{$set:{videos: []}});
  const result=await subtitle.findByIdAndUpdate(id,{$push:{videos: subvideo}},{new: true});
  course=await subtitle.findByIdAndUpdate(id, [{$set : {hours : {$sum : "$videos.duration"}}} ]).select('course');
  //await courses.findByIdAndUpdate(course.course,{ $set: { totalHours: 0} })
  await courses.findByIdAndUpdate(course.course,{ $inc: { totalHours: subvideo.duration} })

  res.status(200).json (result);
}
const addCertificate=async(req,res)=>{
  const {studentId,courseId,studentType} = req.body;

  if(studentType==="corporateTrainee"){
    result = await takes.findOneAndUpdate({corporateTrainee:mongoose.Types.ObjectId(studentId),course:courseId} ,{certificate:true});
  }
  else
    if(studentType==="individualTrainee"){
      result = await takes.findOneAndUpdate({individualTrainee:mongoose.Types.ObjectId(studentId),course:courseId} ,{certificate:true});
      }
  res.status(200).json(result);
}
const addWatchedVideo=async(req,res)=>{
  const {studentId,courseId,studentType,videoId} = req.body;
  //console.log(req.body)
  
  const totalVids = await (await subtitle.find({course:mongoose.Types.ObjectId(courseId)})).map(sub=>{return sub.videos.length}).reduce((acc, x) => acc+x,0);
  //total number of videos in this course

  if(studentType==="corporateTrainee"){
    result = await takes.findOneAndUpdate({corporateTrainee:mongoose.Types.ObjectId(studentId),course:courseId,'videosWatched': { $ne: videoId }} ,{$push:{videosWatched: videoId}},{new: true}); //push new watched video if wasn't already here
    if(result){
      progress=Math.floor((result.videosWatched.length/totalVids)*100); //number of watched/total number of vids
      await takes.findOneAndUpdate({corporateTrainee:mongoose.Types.ObjectId(studentId),course:courseId},{progress:progress});} //update progress   
    }
  else
    if(studentType==="individualTrainee"){
      result = await takes.findOneAndUpdate({individualTrainee:mongoose.Types.ObjectId(studentId),course:courseId,'videosWatched': { $ne: videoId }} ,{$push:{videosWatched: videoId}},{new: true});
      if(result){
       progress=Math.floor((result.videosWatched.length/totalVids)*100);
       console.log(result.videosWatched.length+"  "+totalVids);
       await takes.findOneAndUpdate({individualTrainee:mongoose.Types.ObjectId(studentId),course:courseId},{progress:progress});
    }
      }


  res.status(200).json(result);
}
addSolvedExercise=async (req,res)=>{
  const {studentId,courseId,studentType,exerciseId,grade,answers} = req.body;
  console.log(req.body);

  const totalVids = (await subtitle.find({course:mongoose.Types.ObjectId(courseId)})).map(sub=>{ sub.exercises?exer=1:exer=0; return sub.videos.length+exer; }).reduce((acc, x) => acc+x,0);
  //total number of videos+subs in this course

  if(studentType==="corporateTrainee"){
    result = await takes.findOneAndUpdate({corporateTrainee:mongoose.Types.ObjectId(studentId),course:courseId} ,{$push:{exercisesSolved: {exerciseId,grade,answers}}},{new: true}); //push new solved exerc if wasn't already here
    if(result){
      progress=Math.floor(((result.videosWatched.length+result.exercisesSolved.length)/totalVids)*100); //number of watched/total number of vids
      await takes.findOneAndUpdate({corporateTrainee:mongoose.Types.ObjectId(studentId),course:courseId},{progress:progress});} //update progress   
    }
  else
    if(studentType==="individualTrainee"){
      result = await takes.findOneAndUpdate({individualTrainee:mongoose.Types.ObjectId(studentId),course:courseId} ,{$push:{exercisesSolved: {exerciseId,grade,answers}}},{new: true});
      if(result){
       progress=Math.floor(((result.videosWatched.length+result.exercisesSolved.length)/totalVids)*100);
       console.log(result.videosWatched.length+result.exercisesSolved.length+"  "+totalVids);
       await takes.findOneAndUpdate({individualTrainee:mongoose.Types.ObjectId(studentId),course:courseId},{progress:progress});
    }
      }


  res.status(200).json(result);
}
const getSubtitleExer=async(req,res)=>{
  console.log()
  const subtitleId= req.query.id
  console.log(req.query.id)
  //console.log(req.params.id)

  if(subtitleId){
    const originalexercises = await subtitle.findById(subtitleId,{exercises:1});
    console.log("da eloriginal")
    console.log(originalexercises) //aray of exercises
    const exercises=originalexercises.exercises
    console.log(exercises)
    //const ex1q1=ex1[0]
    //console.log(ex1q1)
    //console.log(ex1q1.questionText)
    res.status(200).json(originalexercises);}
}
const forgotpassword=async(req,res)=>{
  const {email}=req.body;
  try{
    const oldUser=await instructor.findOne({email}) || await corporatetrainee.findOne({email}) || await individualtrainee.findOne({email});
    if(!oldUser){
      return res.json({status:"This email doesn't exist"});
    }
    const secret= process.env.JWT_SECRET + oldUser.password; 
    const token=jwt.sign({email:oldUser.email,id:oldUser._id},secret,{expiresIn:"3m",});
    const link=`http://localhost:3000/resetpassword/${oldUser._id}/${token}`;
    await sendEmail(oldUser.email,"Password Reset","Click on the link to reset your password "+"\n"+link,false,"");

    res.status(200).send({message:"password reset link sent to your email address"});

  }catch(error){
    res.status(500).send({message:"Internal server error"});

  }
}
const verifyurl=async(req,res)=>{
  const {id,token}=req.params;
  //console.log(req.query);
  const oldUser=await instructor.findOne({_id:id}) || await corporatetrainee.findOne({_id:id}) || await individualtrainee.findOne({_id:id}) ;
  if(!oldUser){
    res.status(400).send({message:"Invalid Link"});
  }
  const secret= process.env.JWT_SECRET + oldUser.password;
  try{
    const verify=jwt.verify(token,secret);
    //console.log(verify)
    if(verify){
    res.status(200).send({message:"Valid Url"})}
    else{
    res.status(400).send({message:"Invalid link"});
    }

  }catch(error){
    res.status(500).send("Internal server error");
  }
}

const resetpassword=async(req,res)=>{
  console.log("here");
  const {id,token}=req.query;
  console.log(req.query);
  const oldUser=await instructor.findOne({_id:id}) ||await corporatetrainee.findOne({_id:id}) || await individualtrainee.findOne({_id:id});
  if(!oldUser){
    res.status(400).send({message:"Invalid Link"});
  }
  console.log(oldUser)
  const secret= process.env.JWT_SECRET + oldUser.password; //msh hashed
  console.log(secret)
  try{
    console.log("abl verify")
    const verify=jwt.verify(token,secret);
    console.log("verify")
    console.log(verify)
    if(!verify){
      res.status(400).send({message:"Invalid link"});
    }
    const salt=await bcrypt.genSalt(); 
    const hashPassword=await bcrypt.hash(req.body.password,salt);
    oldUser.password=hashPassword;
    
    const response=await instructor.findByIdAndUpdate(id,{password:hashPassword});
    if(!response){
      const response2=await corporatetrainee.findByIdAndUpdate(id,{password:hashPassword});
      if(!response2){
        await individualtrainee.findByIdAndUpdate(id,{password:hashPassword})
      }
    }
    console.log("tamam")
    res.status(200).send({message:"Password reset successfully"});

  }catch(error){
    console.log("not tamam")
    console.log(error)
    res.status(500).send("Internal server error");
  }
}
const updateInstructorsPassword = async (req,res)=>{
  console.log("updating inst trainee pass")
  const {password} = req.body ;
  const id = req.query.id;
  console.log(password);const salt = await bcrypt.genSalt();//bycrypt di library-- salt da dummy data ba add it bastkhdm salt to avoid easy hacking
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log("f update pass di hashed pass")
  console.log(hashedPassword)
  const result=await instructor.findByIdAndUpdate(id,{password: hashedPassword});
  await instructor.findByIdAndUpdate(id,{flag:true});
  res.status(200).json(result);
  console.log(req.body.password);
}
const updatePasswordCorpTrainee = async (req,res)=>{
  console.log("updating corp trainee pass")
  const {password} = req.body ;
  const id = req.query.id;
  console.log(password);
  const salt = await bcrypt.genSalt();//bycrypt di library-- salt da dummy data ba add it bastkhdm salt to avoid easy hacking
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log("f update pass di hashed pass")
  console.log(hashedPassword)
  const result=await corporatetrainee.findByIdAndUpdate(id,{password: hashedPassword});
  await corporatetrainee.findByIdAndUpdate(id,{flag:true});
  res.status(200).json(result);
  

}
const updatePasswordTrainee = async (req,res)=>{
  const {password} = req.body ;
  const id = req.query.id;
  console.log("f update pass di pass")
  console.log(password);
  const salt = await bcrypt.genSalt();//bycrypt di library-- salt da dummy data ba add it bastkhdm salt to avoid easy hacking
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log("f update pass di hashed pass")
  console.log(hashedPassword)
  const result=await individualtrainee.findByIdAndUpdate(id,{password: hashedPassword});
  res.status(200).json(result);


}
const updateCorpTrainee=async(req,res)=>{
  const {updatedCorpTrainee}=req.body;
  try{
    res.status(200).json(await corporatetrainee.findByIdAndUpdate(updatedCorpTrainee._id,{
    username:updatedCorpTrainee.username,
    email:updatedCorpTrainee.email,
    firstname:updatedCorpTrainee.firstname,
    lastname:updatedCorpTrainee.lastname}));}
  catch{
    res.status(400).json({error:"couldn't update info"})

  }
}
const updateTrainee=async(req,res)=>{
  const {updatedTrainee}=req.body;
  try{
    res.status(200).json(await individualtrainee.findByIdAndUpdate(updatedTrainee._id,{
    username:updatedTrainee.username,
    firstname:updatedTrainee.firstname,
    lastname:updatedTrainee.lastname,
    email:updatedTrainee.email}));}
  catch{
    res.status(400).json({error:"couldn't update info"})

  }
}
const addNote=async(req,res)=>{
  const {studentId,courseId,studentType} = req.query;

 const note=req.body;
 console.log(note)

 if(studentType==="corporateTrainee")
 result=await takes.findOneAndUpdate({corporateTrainee:mongoose.Types.ObjectId(studentId),course:courseId},{$push:{notes: note}});
 else
 if(studentType==="individualTrainee"){
 result = await takes.findOneAndUpdate({individualTrainee:mongoose.Types.ObjectId(studentId),course:courseId},{$push:{notes: note}});}
  res.status(200).json(result);
}
const getNotes=async(req,res)=>{
  const {studentId,courseId,studentType} = req.query;
  var result={};

 if(studentType==="corporateTrainee")
 result=await takes.findOne({corporateTrainee:mongoose.Types.ObjectId(studentId),course:courseId}).select('notes');
 else
 if(studentType==="individualTrainee"){
 result = await takes.findOne({individualTrainee:mongoose.Types.ObjectId(studentId),course:courseId}).select('notes');}
  res.status(200).json(result);
}
const editNote=async(req,res)=>{
  const {studentId,courseId,studentType} = req.query;

 const note=req.body;
 console.log(req.body)
 if(studentType==="corporateTrainee"){
 ans=await takes.findOne({corporateTrainee:mongoose.Types.ObjectId(studentId),course:courseId});
 
 result=await takes.findOneAndUpdate({_id:ans._id,"notes.notetime":note.notetime},{$set:{"notes.$.note":note.note}});
 
 }
 else{
 if(studentType==="individualTrainee"){
  ans=await takes.findOne({individualTrainee:mongoose.Types.ObjectId(studentId),course:courseId});
 result=await takes.findOneAndUpdate({_id:ans._id,"notes.notetime":note.notetime},{$set:{"notes.$.note":note.note}});
 console.log(result);
}
 }
  res.status(200).json(result);
}
const deleteNote=async(req,res)=>{
  const {studentId,courseId,studentType} = req.query;
console.log(req.query)
 const note=req.body;

 if(studentType==="corporateTrainee"){
 ans=await takes.findOne({corporateTrainee:mongoose.Types.ObjectId(studentId),course:courseId});
 result=await takes.findOneAndUpdate({_id:ans._id},{$pull:{notes:{notetime:note.notetime}}});
 }
 else{
 if(studentType==="individualTrainee"){
  ans=await takes.findOne({individualTrainee:mongoose.Types.ObjectId(studentId),course:courseId});
  console.log(ans);
  result=await takes.findOneAndUpdate({_id:ans._id},{$pull:{notes:{notetime:note.notetime}}});
}
 }
  res.status(200).json(result);
}
const sendmail=async(req,res)=>{
  await sendEmail(req.body.email,"Course Completion Certificate","CONGRATULATIONS! Here is your certificate of course completion",true,req.body.doc);
}

const updatePromotion=async(req,res)=>{
  console.log("updating all promotions...")
 const allCourses=await courses.find({published:true,closed:false});

//  const allCourses=req.body.courses;
  
  allCourses.map(async(course)=>{

      if(!(typeof course.promotion === 'undefined')){ 
         start=course.promotion.startDate;
         end=course.promotion.endDate;
         today = new Date()
        if(start<=today && end>=today){
          await courses.findByIdAndUpdate(course._id,{$set : {'promotion.valid' : 1}});
        }
        else{
          if(start>today && end>today)
          await courses.findByIdAndUpdate(course._id,{$set : {'promotion.valid' : 2}}); //upcoming
          else
          await courses.findByIdAndUpdate(course._id,{$set : {'promotion.valid' : 0}});

        }
      }


  })


}

//PAYMENTS
const paymentrequest= async (req, res) => {
  console.log("hi")
  //user sends price along with request
  const userPrice = parseInt(req.body.price)*100;
console.log(userPrice)
  //create a payment intent
  const intent = await stripe.paymentIntents.create({
    
    //use the specified price
    amount: userPrice,
    currency: 'usd'

  });
console.log(intent);
  //respond with the client secret and id of the new paymentintent
  res.status(200).json({client_secret: intent.client_secret, intent_id:intent.id});

}

const confirmpayment= async (req, res) => {
  

  //extract payment type from the client request
  const paymentType = String(req.body.payment_type);
  console.log(req.body.courseId)
  //handle confirmed stripe transaction
  if (paymentType == "stripe") {

    //get payment id for stripe
    const clientid = String(req.body.payment_id);
    var success=false
    //get the transaction based on the provided id
    stripe.paymentIntents.retrieve(
      clientid,
      function(err, paymentIntent) {
        //handle errors
        if (err){
          console.log(err);
        }    
        //respond to the client that the server confirmed the transaction
        if (paymentIntent.status === 'succeeded') {
          /*YOUR CODE HERE*/  
          console.log("confirmed stripe payment: " + clientid);
          //success=true;
          res.json({success: true});
        } else {
          res.json({success: false});
        }
        
      }
    );
   
  }
} 
const AddIndividualTraineeTocourseAfterPayment = async(req,res)=>{
  const value=req.body.value;
  console.log("heyyy");
  console.log(value);
  console.log(req.body.studentId)
  const course= req.body.courseId;
  
   const result=await takes.create({individualTrainee:req.body.studentId,course:req.body.courseId,value:value});
   const myCourse=await courses.findById(course).populate('instructor');
   const myInstructor=myCourse.instructor._id;
   await instructor.findByIdAndUpdate(myInstructor,{$inc : {balance :value }});

    res.json(result);
}
// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (name) => {
    return jwt.sign({ name }, 'supersecret', {  //da name of the user 3ashan aa3rf token da beta3 meen (dayman rely on user inputs)
        expiresIn: maxAge
    });
};

const signUp = async (req, res) => {
  const { username, email, password,firstname, lastname,gender } = req.body;  //bakhod data ml body w badiha lel backend --email is not required
  try {
    if(!username || !password)
     { throw Error('All fields must be filled')

     }
 
 const usernameexists = await individualtrainee.findOne({username})
 const emailexists = await individualtrainee.findOne({email})
 if (usernameexists){
  throw Error('Username already in use')
     }
  else   if (emailexists){
      throw Error('Email already in use')
         }
    else{
    
   //INDIVIDUAL TRAINEE
      //fl data base ana 3ayza a protect elpassword matbansh fl data base
      const salt = await bcrypt.genSalt();//bycrypt di library-- salt da dummy data ba add it bastkhdm salt to avoid easy hacking
      const hashedPassword = await bcrypt.hash(password, salt); //hashes the password(encypts it)
      const user = await individualtrainee.create({ username: username, email: email, password: hashedPassword, firstname: firstname, lastname: lastname, gender:gender }); //bakhod password el3amltlo hash
      const token = createToken(user.username); //jwt tokens
      console.log(user);
 //we dont need to hash password fl login
 //awel ma ye3ml sign up a3tbro by sign up w by login
 //access token by give me access bas lee time mo3yn w bt expire(in seconds)-->not the best option it is a crooky solution
 //in real life --> refresh tokens (bydkhol fi token leeha time mo3yn generate  tani mn nafsaha)
//emta adi token? w howa by sign up aw by login
//fi pages mo3yna lazm yb2a m3aya token 3shan a3rf aftaha\
//lazm a verify eltoken
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });// hab3at token f cookie f var esmo jwt
      res.status(200).json({user,message:"individualTrainee"})
      console.log(user)
    }
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
}
const checkPassword = async (req,res)=>{
  console.log("ana f check password")
  const {OldPassword, DataBasePassword}=req.body;

  if (OldPassword && DataBasePassword){
  const result = await bcrypt.compare(OldPassword,DataBasePassword);

  
  
  console.log(result);
  res.status(200).json(result)
  }
  else{
    
    res.status(400).json({ error:"Please fill all the required fields" })
  }
  }


const login = async (req, res) => {
  // TODO: Login the user
  //steps:
  //1- yedakhal username w password
  //2- check eno username aw email da mawgoud(no duplicate usernames)
  //3-a use bycrypyt. compare to compare passwords
  // wrong username or password 
  //post di mestanya haga ml user fl bodyy
  const { username,  password } = req.body;
  const individualuser = await individualtrainee.findOne({username:username}) //law astakhdemt find bas hatrg3ha f array law estakhdmt find one hayrg3 1 object
  const corporateuser = await corporatetrainee.findOne({username:username}) 
  const instructoruser = await instructor.findOne({username:username})
  const adminstratoruser = await adminstrator.findOne({username:username})
  if(!username || !password){ 
    res.status(400).json({ error:"fill username & password" })
 }
  if (individualuser){
      const databasePass=await individualuser.password;
      const user = individualuser 
      const result = await bcrypt.compare(password,databasePass);
      if (result){
     // if (databasePass === password){
          const token = createToken(individualuser.username); //jwt tokens
          res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });// hab3at token f cookie f var esmo jwt
          res.status(200).json({user,message:"individualTrainee"})
      }
      else{
          res.status(400).json({ error:"wrong password" })  

      }
    }
    else if (corporateuser){
        console.log("da corporate")
        const databasePass=await corporateuser.password;
        const user = corporateuser
        console.log(databasePass);
        //const enteredPass=password;
        const result = await bcrypt.compare(password,databasePass);
        console.log(result);
        if (result){
            const token = createToken(corporateuser.name); //jwt tokens
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });// hab3at token f cookie f var esmo jwt
            res.status(200).json({user,message:"corporateTrainee"})
        }
      else {
           res.status(400).json({ error:"wrong password" })  //ask
      }
    }
    else if(instructoruser){
      const databasePass=await instructoruser.password;
      console.log(databasePass);
      const user = instructoruser
      //const enteredPass=password;
      const result = await bcrypt.compare(password,databasePass);
      console.log(result);
      if (result){
          const token = createToken(instructoruser.name); //jwt tokens
          res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });// hab3at token f cookie f var esmo jwt
          res.status(200).json({user,message:"instructor"})
      }
    else {
          res.status(400).json({ error:"wrong password" })  //ask

    }
    }
    else if (adminstratoruser){
      const databasePass=await adminstratoruser.password;
      console.log(databasePass);
      const user = adminstratoruser
      //const enteredPass=password;
      const result = await bcrypt.compare(password,databasePass);
      console.log(result);
      if (result){
          const token = createToken(adminstratoruser.name); //jwt tokens
          res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });// hab3at token f cookie f var esmo jwt
          res.status(200).json({user,message:"admin"})
    }
    else {
      res.status(400).json({ error:"wrong password" })  //ask
    }
    }
  else{
      res.status(400).json({ error:"wrong username" })  //ask
  }
}

const logout = async (req, res) => {
  // TODO Logout the user
  res.cookie('jwt', "", { httpOnly: true, maxAge: maxAge * 1 });
  res.status(200).json( "logout done" )
}

const instructorFirstLogin = async (req, res) => {
  const id=req.query.id;

  try{
  const result = await instructor.findByIdAndUpdate(id,{$set : {flag :true}});
  res.status(200).json(result )}
  catch{
    res.status(400).json({error:"error" });
  }
}

const corpFirstLogin = async (req, res) => {
  const id=req.query.id;

  try{
  const result = await corporatetrainee.findByIdAndUpdate(id,{$set : {flag :true}});
  res.status(200).json(result )}
  catch{
    res.status(400).json({error:"error" });
  }
}

//money owed for instructor
// const InstructorPayment = async (req,res )=>{
//   //getting all the courses
//   const userId=req.query.id;
//   const q="";
//   console.log(userId)
 
//   if(userId){
//   const x = await courses.find({instructor:mongoose.Types.ObjectId(userId)}).populate('instructor');
//   const coursestaughtbythisinstructor=x.filter((course)=>course.title.toLowerCase().includes(q)
//     ||course.subject.toLowerCase().includes(q));
//   var moneyowed=0;
//   const arrayofStudentsCourses=[];
//   console.log(coursestaughtbythisinstructor[0]._id)
//   for (let i=0;i<coursestaughtbythisinstructor.length;i++){
//     //get the number of students in every course
//      const studentstakingthiscourse= await takes.find({course:mongoose.Types.ObjectId(coursestaughtbythisinstructor[i]._id)});
//       const numberofstudentstakingthiscourse= studentstakingthiscourse.length;
//     //multiply number of students in a course * course price * 60% (instructor percentage)
//       const amountpercourse=coursestaughtbythisinstructor[i].price *numberofstudentstakingthiscourse*0.6;
//       arrayofStudentsCourses.push({course:coursestaughtbythisinstructor[i]._id,numberofstudents:numberofstudentstakingthiscourse,amountpercourse:amountpercourse})
//     //add all the amounts earned by instructor for every course he teaches
//       moneyowed=moneyowed+amountpercourse; 
// }
// console.log(arrayofStudentsCourses)
// res.status(200).json(moneyowed)
// }
// else{
//   res.status(400).json({ error:"no instructor id provided"}) 
// }
// }
const InstructorPayment = async (req,res )=>{
  const userId=req.query.id;
 
  if(userId){
  const coursestaughtbythisinstructor= await courses.find({instructor:mongoose.Types.ObjectId(userId),published:true});
  var moneyowed=0;
  const arrayofStudentsCourses=[];

  for (let i=0;i<coursestaughtbythisinstructor.length;i++){

    //get the number of students in every course
    const studentsPerCourse= await takes.find({course:mongoose.Types.ObjectId(coursestaughtbythisinstructor[i]._id)}).count();
    console.log("studentstakingthiscourse  "+studentsPerCourse);
    topIds=await takes.aggregate([{$group : {_id : "$course", "count" : {$sum : 1}}},{$sort : {"count" : -1}},{$limit : 10}]);//returns array of ids and count of top 5 most popular 

    const amount=await takes.aggregate([{$match:{'course':coursestaughtbythisinstructor[i]._id } },
                                                {$group : {_id : "$course", "amount" : {$sum : "$value"}}}]); //array of object

    if(amount[0])
     amountpercourse= amount[0].amount;
    else 
     amountpercourse=0;

    //console.log(amountpercourse);

    arrayofStudentsCourses.push({course:coursestaughtbythisinstructor[i],numberofstudents:studentsPerCourse,amountpercourse:amountpercourse})
    //add all the amounts earned by instructor for every course he teaches
}
console.log(arrayofStudentsCourses) //kol course bel sum value bel no of students
res.status(200).json(arrayofStudentsCourses)
}
else{
  res.status(400).json({ error:"no instructor id provided"}) 
}
}
const NumberofStudentsPerCourse = async (req,res )=>{
  const userId=req.query.id;
  const q="";
  console.log(userId)
 
  if(userId){
  const x = await courses.find({instructor:mongoose.Types.ObjectId(userId)}).populate('instructor');
  const coursestaughtbythisinstructor=x.filter((course)=>course.title.toLowerCase().includes(q)
    ||course.subject.toLowerCase().includes(q));
  const arrayofnumberofstudents=[];
  for (let i=0;i<coursestaughtbythisinstructor.length;i++){
    //get the number of students in every course
     const studentstakingthiscourse= await takes.find({course:mongoose.Types.ObjectId(coursestaughtbythisinstructor[i]._id)})
      const numberofstudentstakingthiscourse= studentstakingthiscourse.length;
    //multiply number of students in a course * course price * 60% (instructor percentage)
      //const amountpercourse=coursestaughtbythisinstructor[0].price *numberofstudentstakingthiscourse*0.6;
      arrayofnumberofstudents.push(numberofstudentstakingthiscourse)
    
}
console.log(arrayofnumberofstudents)
res.status(200).json(arrayofnumberofstudents)
}
else{
  res.status(400).json({ error:"no instructor id provided"}) 
}

}
//bonus
const instructorPublishCourse = async (req,res )=>{ 
  const {courseId}=req.query
  const result=await courses.findByIdAndUpdate(courseId,{published:true});
  res.status(200).json(result)
}
const instructorCloseCourse = async (req,res )=>{ 
  const {courseId}=req.query
  const course = await courses.findById(courseId);
  newClosed=!course.closed;
  const result=await courses.findByIdAndUpdate(courseId,{closed:newClosed});
  res.status(200).json(result)
}


const pendingReport=async (req,res)=>{
  const request = req.body.request;
  const adminMessage = req.body.adminMessage;
const  response=await report.findByIdAndUpdate(request._id,{$set : {status : "pending",adminMessage:adminMessage}});
 res.status(200).json(response);
}

const resolvingReport = async (req,res)=>{
  const {request} = req.body;
  const  response=await report.findByIdAndUpdate(request._id,{$set : {status : "resolved"}});
   res.status(200).json(response);
 
  }
  
const insertingFollowUp =async (req,res) => {
 
  id=req.query.id; //report id
  const follow= req.query.follow;  
  console.log(id)
  console.log(follow)
  const response = await report.findByIdAndUpdate({_id:id},{followUp:follow,status : "unseen"});
  if(response){
    res.status(200).json(response);
  }
  else
  {
    res.status(400).json({error:"couldn't add followup"})
  }
}
const instructorReporting = async (req,res)=> {
  console.log("instructor reporting")
  const {content,user,courseId} = req.body;
 
   try {
    const r = await report.create({content:content,instructor:user,course:courseId});
    
    
     res.status(200).json(r); 
   
 }
 catch{
   res.status(400).json({error:"couldn't report "})
 } 
 }
 const individualTraineeReporting = async (req,res)=> {
   const {content,user,courseId} = req.body;
   try {
    const r = await report.create({content : content ,individualTrainee:user,course:courseId});
   res.status(200).json(r);
 }
 catch{
   res.status(400).json({error:"couldn't report "})
 } 
 }
 
 const corporateTraineeReporting =async(req,res)=>{
   const {content,user,courseId} = req.body;
   try {
    const r = await report.create({content : content ,corporateTrainee:user,course:courseId});
   }
  catch{
    res.status(400).json({error:"couldn't report "})
  } 
 }
 const adminSeenReports = async (req,res )=>{
  console.log("heyyyy")
  try{
    const allReports=res.status(200).json(await report.find({}));
    allReports.map(rep=>{if(rep.status==="unseen")
     report.findByIdAndUpdate(rep._id,{rtatus:"pending"})});
     res.status(200).json(allReports)
  }
  catch{
    res.status(400).json({error:"Errorrrr"})
  } 
  }

  const adminViewReports = async (req,res )=>{
    try{
    res.status(200).json(await report.find({status:"unseen"}).populate('course').populate('individualTrainee').populate('instructor').populate('corporateTrainee'));
    }
    catch{
      res.status(400).json({error:"Errorrrr"})
    } 
  }
  const individualviewReports=async(req,res)=>{
    const userid = req.query.userid;
    console.log(userid)
    try{
      res.status(200).json(await report.find({individualTrainee : userid}).populate('course'));
      }
      catch(err){
        console.log(err);
        res.send("Error");
      } 
  }
  const corpviewReports=async(req,res)=>{
    const id = req.query.id;
    console.log(id);
    try{
      res.status(200).json(await report.find({corporateTrainee : id}).populate('course'));
      }
      catch(err){
        console.log(err);
        res.send("Error");
      } 
  }
  const instructorviewReports=async(req,res)=>{
    const userid = req.query.userid;
    console.log(userid)
    try{
      res.status(200).json(await report.find({instructor:userid}).populate('course'));
      }
      catch(err){
        console.log(err);
        res.send("Error");
      } 
  }
  const PayfromBalance=async(req,res)=>{
    const userid = req.body.id
    const courseprice=req.body.price
    console.log(userid)
    console.log(courseprice)
    const trainee=await individualtrainee.findById(userid);
    const balance=trainee.balance
    console.log(balance)
    if (balance-courseprice>=0){
      const newbalance=balance-courseprice;
      await individualtrainee.findByIdAndUpdate(userid,{balance:newbalance});
      res.status(200).json({message:"success"});
    }
    else{
      res.status(200).json(null);
    }
    
  }
  const updateCourse=async(req,res)=>{
    const {updatedCourse}=req.body;
    console.log(updatedCourse)
    try{
      res.status(200).json(await courses.findByIdAndUpdate(updatedCourse._id,{
      title:updatedCourse.title,
      price:updatedCourse.price,
      subject:updatedCourse.subject,
      summary:updatedCourse.summary,
      video:updatedCourse.video}));}
    catch{
      res.status(400).json({error:"couldn't update course"})
  
    }
  }
  
  const DeleteSubtitles=async(req,res)=>{
    const id=req.body.id;
    console.log(id)
    try{
     const result= await subtitle.findByIdAndDelete({_id:id});
     
     
      res.status(200).json(result)
     
    }
    catch(err){
      console.log(err)
      res.status(400).json(err)
  
    }
  }
  


module.exports={findPrices,findSubjects,instructorCourses,viewPrice,viewCourses,viewInstructor,viewInstructors,viewSubtitles,viewRegisteredCourse,addinstructor,addCourseReview,addCoursePromo,updateInstructor,filterprice,filter,searchCourses,addcourse,addadmin,addcorporatetrainee,addSubtitle,addSubtitleExer,getSubtitleExer,addCourseVideo,
  addSubtitleVideo,forgotpassword,resetpassword,verifyurl,addinstructorReview,updateInstructorsPassword,viewCorpTrainee,updateCorpTrainee,updatePasswordCorpTrainee,viewCorpTrainees,viewTrainees,updatePromotion,
  updatePasswordTrainee,updateTrainee,viewTrainee,studentTakesCourse,
  getMostPopular,requestRefund,refundRequests,traineeRefundRequests,
  getNotes,addNote,editNote,deleteNote,addWatchedVideo,studentCourses,
  requestAccess,studentAccessRequests,accessRequests,acceptAccessRequest,
  acceptRefundRequest,rejectAccessRequest,rejectRefundRequest,sendmail,confirmpayment,addSolvedExercise,instructorFirstLogin,corpFirstLogin,addSubject,deleteSubject,
  paymentrequest,login,logout,signUp,checkPassword,AddIndividualTraineeTocourseAfterPayment,InstructorPayment,NumberofStudentsPerCourse,addCertificate,instructorPublishCourse,instructorCloseCourse,
  instructorReporting,individualTraineeReporting ,corporateTraineeReporting, insertingFollowUp,individualviewReports,instructorviewReports,corpviewReports,adminSeenReports,adminViewReports,pendingReport,resolvingReport,PayfromBalance,updateCourse,DeleteSubtitles};
