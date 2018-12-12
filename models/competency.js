const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CompetencySchema = mongoose.Schema({
  id: {
    type: String
  },
  value: {
    type: String
  },
  description: {
  	type: [{}]
  },
  programs: {
    type: [Schema.Types.ObjectId]
  }
})
const Competency = (module.exports = mongoose.model("Competency", CompetencySchema))