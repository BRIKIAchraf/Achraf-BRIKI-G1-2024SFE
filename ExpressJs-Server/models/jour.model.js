const mongoose = require('mongoose');

const jourSchema = new mongoose.Schema({
  h_entree1: { type: Date },
  h_sortie1: { type: Date },
  h_entree2: { type: Date },
  h_sortie2: { type: Date },
  id_planning: { type: mongoose.Schema.Types.ObjectId, ref: 'Planning' }
});

module.exports = mongoose.model('Jour', jourSchema);

//const Jour = mongoose.model("Jour", jourSchema);
//module.exports = Jour;
