const mongoose = require('mongoose')
const Schema = mongoose.Schema
//Name is an array of objects just like the aPI specification describes
//Programs contains an array of ids which reference specific programs
const FacultySchema = mongoose.Schema({
  id: {
    type: String
  },
  name: {
    type: [{}]
  },
  programs: {
    type: [Schema.Types.ObjectId]
  }
});
const Faculty = module.exports = mongoose.model('Faculty', FacultySchema);