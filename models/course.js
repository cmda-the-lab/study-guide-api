const mongoose = require('mongoose')
const Schema = mongoose.Schema

//In the typescript data model a lot of fields are described as I18NRoot[]'s
// As that structure is too complex to have in the db we've opted here for Strings
// These will prob be htmlstrings that we'll break back into elements clientside 
// I've added the field indicators to the model!!!
const CourseSchema = mongoose.Schema({
  id: {
    type: String
  },
  name: {
    type: [{}]
  },
  description: {
    type: String
  },
  year: {
  	type: String
  },
  credits: {
  	type: Number
  },
  start: {
    type: String
  },
  end: {
    type: String
  },
  languages: {
    type: [String]
  },
  coordinators: {
    type: [Schema.Types.ObjectId]
  },
  coordinatorsSummary: {
    type: String
  },
  teachers: {
    type: [Schema.Types.ObjectId]
  },
  teachersSummary: {
    type: String
  },
  competencies: {
    type: [Schema.Types.ObjectId]
  },
  competenciesSummary: {
    type: String
  },
  indicators: {
    type: [Schema.Types.ObjectId]
  },
  objectivesSummary: {
    type: String
  },
  program: {
    type: Schema.Types.ObjectId
  },
  faculty: {
    type: Schema.Types.ObjectId
  }
});
const Course = module.exports = mongoose.model('Course', CourseSchema);