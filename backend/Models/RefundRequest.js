const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');
const Schema = mongoose.Schema;

const refundSchema = new Schema({
    individualTrainee: {
         type: Schema.Types.ObjectId,
         ref: 'IndividualTrainee' },        
    course: {
        type: mongoose.Types.ObjectId,
        ref:'Course',
        required: true,
      },
    value:{
        type:Number,
    },
    comment:{
      type:String,
    },
    state:{
      type: String, 
      enum: ['accepted', 'pending'],
      default:'pending'
    }

  }, { timestamps: true });
const refundRequest = mongoose.model('RefundRequest', refundSchema);

// const refund1=new refundRequest({
//     corporateTrainee:"6360245bfa4e7d6238c1a4ed",
//     course:"637161faeb76a7b5e34443f4",
//     state:"x",

// });

//refund1.save();

module.exports = refundRequest;