    const mongoose = require('mongoose');

    const employeSchema = new mongoose.Schema({
      uid: { type: String, required: true }, // Assurez-vous que c'est bien unique et primaire si nécessaire.
      user_id: { type: String, required: true, unique: true }, // Marqué comme unique.
      template: { type: String, required: false }, // Pas marqué comme required car 'nullable=True' dans Flask.
      login_method: { 
        type: String, 
        enum: ['PassOrFingerOrCard', 'Card', 'FingerAndPass'], 
        required: true 
      },
      // Incluez les autres champs comme 'nom', 'prenom', etc., si nécessaire.
      nom: { type: String, required: true },
      prenom: { type: String, required: true },
      date_naissance: { type: Date, required: true },
      type: { type: String, required: true }, // Assurez-vous que ce champ est bien mappé avec les champs correspondants dans Flask.
      id_planning: { type: mongoose.Schema.Types.ObjectId, ref: 'Planning' },  // Assurez-vous que la référence est correcte.
      id_empreinte: { type: mongoose.Schema.Types.ObjectId, ref: 'Empreinte' },  // Assurez-vous que la référence est correcte.
      externalId: { type: String, required: true, unique: true }, // Assurez-vous que c'est bien unique.
      card: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' }, 
    });

    module.exports = mongoose.model('Employe', employeSchema);
