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
    type: [{ type: String, enum: ["foundation", "profiling", "minor", "graduation"] }]
  },
  languages: {
    type: [{ type: String, enum: ["en", "nl"] }]
  },
  coordinators: {
    type: [Schema.Types.ObjectId]
  },
  modules: {
    type: [Schema.Types.ObjectId]
  }
})
const Cluster = (module.exports = mongoose.model("Cluster", ClusterSchema))
