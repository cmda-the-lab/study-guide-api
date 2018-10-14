const mongoose = require("mongoose")
const Schema = mongoose.Schema
//Name is an array of ibjects which can hold the different languages
//description is a normal string.
//indicators references the indicators in this Competency. We coul nest
// indicators in competencies.
const CompetencySchema = mongoose.Schema({
  id: {
    type: String
  },
  value: {
    type: String
  },
  programs: {
    type: [Schema.Types.ObjectId]
  }
})
const Competency = (module.exports = mongoose.model("Competency", CompetencySchema))
