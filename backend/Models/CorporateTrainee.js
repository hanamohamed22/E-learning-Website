const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const corporatetraineeSchema = new Schema({
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
      required: false,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    flag:{
      type:Boolean,
      default:false
    },
    firstname: {
        type: String,
        required: false,
      },
      lastname: {
        type: String,
        required: false,
      },
      corporate: {
        type: String,
        required: false,
      },
      gender: {
        type: String,
        required: false,
      },

  
  }, { timestamps: true });
const corporatetrainee = mongoose.model('CorporateTrainee', corporatetraineeSchema);
module.exports = corporatetrainee;
//modified//