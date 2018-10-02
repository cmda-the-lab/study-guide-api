const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
  id: {
    type: String
  },
  name: {
    type: String
  },
  email: {
    type: String
  }
});
const Person = module.exports = mongoose.model('Person', PersonSchema);