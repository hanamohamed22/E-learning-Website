const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subtitleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
    videos:[{ 
      videoURL: { 
      type:String,
      validator: value => validator.isURL(value, { protocols: ['http','https','ftp'], require_tld: true, require_protocol: true }),
      message: 'Must be a Valid URL',
      required:true},

      description: {
        type: String,
        required: true,
      },
      duration:{
        type:Number,
        required:true
      }

  }], //lw array of videos bel description bta3etha ya dodo
    course: {
      type: mongoose.Types.ObjectId,
      ref:'Course',
      required: true,
    },
    hours: {
      type: Number,
      required: true,
    },
    exercises: {
      type: [
        {questionText:{type: String,required: true } , 
        answerOptions:[{answerText: String, isCorrect: Boolean}]}
      ],
      required: false,
    }
  }, { timestamps: true });
  
const subtitle = mongoose.model('Subtitle', subtitleSchema);

// const subtitle1=new subtitle({
//     title:"Introductio to javascrip functions",
//     videoURL:"https://www.youtube.com/watch?v=aZGzwEjZrXc&t=9s",
//     hours:7,
//     description: "how to import and export components",
//     course:"635bdf46d413e7b2e489a03d",
//     excercises:["ex1","ex2","ex3"]
    
// });
 //console.log("created")

//subtitle.populate('course');
 //subtitle1.save();

module.exports =subtitle ;