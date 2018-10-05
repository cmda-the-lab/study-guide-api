const mongoose = require('mongoose');
//Name is a normal string. Enforcing it to be an i18literal can be done through a method
//Courses contains an array of ids which reference specific courses
//Competencies contains an array of ids which reference specific competencies
//Faculty contains a reference to a specific faculty
const ProgramSchema = mongoose.Schema({
  id: {
    type: String
  },
  name: {
    type: String
  },
  courses: {
    type: [Schema.Types.ObjectId]
  },
  competencies: {
  	type: [Schema.Types.ObjectId]
  },
  faculty: {
  	type: Schema.Types.ObjectId
  }
});
const Program = module.exports = mongoose.model('Program', ProgramSchema);