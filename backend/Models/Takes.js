const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const takesSchema = new Schema({

    corporateTrainee: {
         type: Schema.Types.ObjectId,
         ref: 'CorporateTrainee' },
    individualTrainee: {
         type: Schema.Types.ObjectId,
         ref: 'IndividualTrainee' },        
    course: {
        type: mongoose.Types.ObjectId,
        ref:'Course',
        required: true,
      },
    progress:{
        type:Number,
        default:0,
    },
    notes: {
      type: [{
        notetime:{type: String,
        required: true } , 
        note:{type: String,required: true },
        videoid:{type:String,required:true}}],
        required:false
    },
    videosWatched:{ //ids
      type:[String],
      default:[]
    },
    certificate:{
      type:Boolean,
      default:false,
      required:false
    },
    exercisesSolved:{ //ids
      type:[{
        exerciseId:String,
        grade:{right:Number,total:Number}, //kaza out of kaza
        answers:[{wrong:Boolean,element:Number}] //wrong 0 or 1 & element = answer index
    }],
      default:[]
    },
    value:{
      type:Number
    }

  }, { timestamps: true });
const takes = mongoose.model('Takes', takesSchema);

const takes1=new takes({
    individualTrainee:"638cbd05b6e568db74b37511",
    course:"636007b244d0dc8bc66e5f75",
    progress:0
});

// takes1.save();

module.exports = takes;