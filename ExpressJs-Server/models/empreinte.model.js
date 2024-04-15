const mongoose = require('mongoose');

const empreinteSchema = new mongoose.Schema({
  empreinte: { type: String, required: true }
});

module.exports = mongoose.model('Empreinte', empreinteSchema);

//const Empreinte = mongoose.model("Empreinte", empreinteSchema);
//module.exports = Empreinte;
