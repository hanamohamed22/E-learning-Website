const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');
const Schema = mongoose.Schema;

const accessSchema = new Schema({
    corporateTrainee: {
         type: Schema.Types.ObjectId,
         ref: 'CorporateTrainee' },        
    course: {
        type: mongoose.Types.ObjectId,
        ref:'Course',
        required: true,
      },

  }, { timestamps: true });
const accessRequest = mongoose.model('AccessRequest', accessSchema);

// const refund1=new refundRequest({
//     corporateTrainee:"6360245bfa4e7d6238c1a4ed",
//     course:"637161faeb76a7b5e34443f4",
//     state:"x",

// });

//refund1.save();

module.exports = accessRequest;