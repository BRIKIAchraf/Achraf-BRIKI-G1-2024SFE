const mongoose = require('mongoose');

const pointageSchema = new mongoose.Schema({
  h_entree: { type: Date, required: true },
  h_sortie: { type: Date, required: true },
  duree: { type: Number },
  id_employe: { type: mongoose.Schema.Types.ObjectId, ref: 'Employe' }
});

module.exports = mongoose.model('Pointage', pointageSchema);

//const Pointage = mongoose.model("Pointage", pointageSchema);
//module.exports = Pointage;
