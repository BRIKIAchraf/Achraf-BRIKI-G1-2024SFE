// models/finger.model.js
const mongoose = require('mongoose');

const fingerSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  fid: { type: Number, required: true },
  template: { type: String, required: true }
});

module.exports = mongoose.model('Finger', fingerSchema);
