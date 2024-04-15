const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  cardNumber: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employe', default: null },
});

module.exports = mongoose.model('Card', cardSchema);
