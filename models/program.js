const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProgramSchema = mongoose.Schema({
  id: {
    type: String
  },
  code: {
    type: String
  },
  degree: {
    type: String,
    enum: ["bachelor"]
  },
  credits: {
    type: Number
  },
  name: {
    type: [{}]
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
})
const Program = (module.exports = mongoose.model("Program", ProgramSchema))
