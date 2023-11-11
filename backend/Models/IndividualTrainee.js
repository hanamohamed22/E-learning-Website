const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const traineeSchema = new Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email:{
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      balance:{
        type:Number,
        default:0,
      }

  
  }, { timestamps: true });
const trainee = mongoose.model('IndividualTrainee', traineeSchema);

const trainee1=new trainee({
  username:"yasmine_elserafy",
  password:"joussa",
  email:"yasmine_elserafy@hotmail.com",
  firstname:"yasmine",
  lastname:"elserafy",
  gender:"female"
});

//trainee1.save();

module.exports = trainee;
//modified//

