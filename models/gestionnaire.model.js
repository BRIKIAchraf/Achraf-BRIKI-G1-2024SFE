const mongoose = require('mongoose');

const gestionnaireSchema = new mongoose.Schema({
  id_employe: { type: mongoose.Schema.Types.ObjectId, ref: 'Employe', required: true },
  username: { type: String, required: true },
  pwd: { type: String, required: true } // Should be hashed in real applications
});

module.exports = mongoose.model('Gestionnaire', gestionnaireSchema);

//const Gestionnaire = mongoose.model("Gestionnaire", gestionnaireSchema);
//module.exports = Gestionnaire;
