const mongoose = require('mongoose');

const planningSchema = new mongoose.Schema({
  intitule: { type: String, required: true }
});

module.exports = mongoose.model('Planning', planningSchema);


//const Planning = mongoose.model("Planning", planningSchema);
//module.exports = Planning;
