const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const SubjectsSchema = new Schema({
    subject: {
      type: String,
      required: true}
    

}, { timestamps: true });


const subjects = mongoose.model('Subjects', SubjectsSchema);
const subject=new subjects({
 subject:"programming"

});
//subject.save();

module.exports = subjects;