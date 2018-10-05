const mongoose = require('mongoose');
//Name is a normal string. Enforcing it to be an i18literal can be done through a method
//description is a normal string.
//Competency references the corresponding competency for this indicator. We coul nest
// indicators in competencies.
const IndicatorSchema = mongoose.Schema({
  id: {
    type: String
  },
  name: {
    type: String
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