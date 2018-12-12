const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ClusterSchema = mongoose.Schema({
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
  languages: {
    type: [{ type: String, enum: ["en", "nl"] }]
  },
  coordinators: {
    type: [Schema.Types.ObjectId]
  },
  courses: {
    type: [Schema.Types.ObjectId]
  }
})
const Cluster = (module.exports = mongoose.model("Cluster", ClusterSchema))
