const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const instructor = require('./Instructor');

const courseSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    totalHours: {
      type: Number,
      required: false,
    },
    avgRating:{
      type:Number,
      required:false
    },
    rating: {
      type: [Number],
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    promotion:{
      percent:Number,
      startDate:Date,
      endDate:Date,
      valid: 
      {type:Number,
      default:0} ,//0:khelset 1:current 2:upcoming
      admin:Boolean

    },
    subject: {
      type: String,
      required: false,
    },
    instructor: {
      type: mongoose.Types.ObjectId,
      ref:'Instructor',
      required: false,
    },
    summary: {
      type: String,
      required: true,
    },
    img:{
      type:String,
      validator: value => validator.isURL(value, { protocols: ['http','https','ftp'], require_tld: true, require_protocol: true }),
      message: 'Must be a Valid URL',
      required:false},

    video:{
      type:String,
      validator: value => validator.isURL(value, { protocols: ['http','https','ftp'], require_tld: true, require_protocol: true }),
      message: 'Must be a Valid URL',
      required:false},

    reviews:[{ comment:String, stars:Number, author:String   }],

    published:{
      type:Boolean,
      default:false,
    },
    
    closed:{
      type:Boolean,
      default:false,
    }

    
  }, { timestamps: true },{ strict: false });
const course = mongoose.model('Course', courseSchema);

const course1=new course({
    title:"Javascript course",
    subtitle:"sub",
    totalHours:80,
    rating: 5,
    price:800,
    subject: "programming",
    instructor:"63555273715365376d67988d",
    summary:"this is your go to javascript course",
    excercises:["ex1","ex2"]
});

//course1.populate('instructor');
//course1.save();

module.exports = course;