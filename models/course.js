const mongoose = require("mongoose")
const Schema = mongoose.Schema

//In the typescript data model a lot of fields are described as I18NRoot[]'s
// As that structure is too complex to have in the db we've opted here for Strings
// These will prob be htmlstrings that we'll break back into elements clientside
// I've added the field indicators to the model!!!
const CourseSchema = mongoose.Schema({
  id: {
    type: String,
  },
  sisId: {
    type: String
  },
  name: {
    type: [{}]
  },
  shortDescription: {
    type: [{}]
  },
  description: {
    type: [{}]
  },
  phase: {
    type: String
  },
  years: {
    type: [String]
  },
  learningYears: {
    type: [String]
  },
  periods: {
    type: [String]
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
    type: [{ type: String, enum: ["en", "nl"] }]
  },
  methods: {
    type: [{ type: String, enum: ["practicum", "lecture", "lab", "coaching"] }]
  },
  methodsSummary: {
    type: [{}]
  },
  coordinators: {
    type: [Schema.Types.ObjectId]
  },
  coordinatorsSummary: {
    type: [{}]
  },
  teachers: {
    type: [Schema.Types.ObjectId]
  },
  teachersSummary: {
    type: [{}]
  },
  competencies: {
    type: [Schema.Types.ObjectId]
  },
  circles: {
    type: [String]
  },
  indicators: {
    type: [Schema.Types.ObjectId]
  },
  indicatorSummary: {
    type: [{}]
  },
  objectivesSummary: {
    type: [{}]
  },
  program: {
    type: Schema.Types.ObjectId
  },
  faculty: {
    type: Schema.Types.ObjectId
  }
})
const Course = (module.exports = mongoose.model("Course", CourseSchema))
