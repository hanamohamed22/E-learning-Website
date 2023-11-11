const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const instructorSchema = new Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
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
    bio:{
      type:String,
      required: false,
    },
    img:{
      type:String,
      validator: value => validator.isURL(value, { protocols: ['http','https','ftp'], require_tld: true, require_protocol: true }),
      message: 'Must be a Valid URL',
      required:false},

    reviews:[{ comment:String, stars:Number, author:String   }],
    
    avgRating:{
      type:Number,
      required:false
    },
    flag:{
      type:Boolean,
      default:false
    },
    balance:{
      type:Number,
      default:0
    }
  
  }, { timestamps: true });
const instructor = mongoose.model('Instructor', instructorSchema);
module.exports = instructor;