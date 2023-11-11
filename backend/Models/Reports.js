const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const instructor = require('./Instructor');
const indTrainee = require('./IndividualTrainee');
const corpTarinee = require ('./CorporateTrainee'); 

const ReportSchema = new Schema({
    content: {
      type: String,
      required: false,
    },
    status :{
        type:String ,
        default : "unseen",
        required: false
    } ,
    date : {

     type : Date, default: Date.now

    } ,
    instructor: {
      type: mongoose.Types.ObjectId,
      ref:'Instructor',
      required: false,
    },
          corporateTrainee: {
            type: Schema.Types.ObjectId,
            ref: 'CorporateTrainee' ,
            required: false,
          },
          individualTrainee: {
            type: Schema.Types.ObjectId,
            ref: 'IndividualTrainee' ,
            required: false,
          },
          followUp :{
            type:String ,
            required : false,
            default : "",
          },
          course: {
            type: mongoose.Types.ObjectId,
            ref:'Course',
            required: true,
          },
          adminMessage:{
            type:String
          }

}, { timestamps: true },{ strict: false });
const report = mongoose.model('Reports', ReportSchema);
const report1=new report({
  Content:"JUST TRYING",
  Status : "unseen",
  instructor: "salma", 

});

module.exports = report;