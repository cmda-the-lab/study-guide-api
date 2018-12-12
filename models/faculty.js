const mongoose = require("mongoose")
const Schema = mongoose.Schema

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
})
const Faculty = (module.exports = mongoose.model("Faculty", FacultySchema))
