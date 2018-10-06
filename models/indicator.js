const mongoose = require('mongoose')
const Schema = mongoose.Schema
//Name is an array of ibjects which can hold the different languages
//description is a normal string.
//Competency references the corresponding competency for this indicator. We coul nest
// indicators in competencies.
const IndicatorSchema = mongoose.Schema({
  id: {
    type: String
  },
  name: {
    type: [{}]
  },
  description: {
    type: String
  },
  competency: {
  	type: Schema.Types.ObjectId
  },
  program: {
  	type: Schema.Types.ObjectId
  }
});
const Indicator = module.exports = mongoose.model('Indicator', IndicatorSchema);