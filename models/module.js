const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ModuleSchema = mongoose.Schema({
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
  type: {
    type: String
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
  productsLearned: {
    type: [String]
  },
  productsAsked: {
    type: [String]
  },
  researchMethodsLearned: {
    type: [String]
  },
  researchMethodsAsked: {
    type: [String]
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
    type: String
  },
  spaces: {
    type: String
  },
  level: {
    type: String
  },
  objectivesSummary: {
    type: [{}]
  },
  assessments: {
    type: [String]
  },
  assessmentsSummary: {
    type: [{}]
  },
  studyMaterialsRequired: {
    type: String
  },
  studyMaterialsUsed: {
    type: String
  },
  program: {
    type: Schema.Types.ObjectId
  },
  faculty: {
    type: Schema.Types.ObjectId
  }
})
const Module = (module.exports = mongoose.model("Module", ModuleSchema))
