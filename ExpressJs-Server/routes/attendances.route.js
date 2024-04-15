// routes/attendance.route.js

const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendances.controller');
// Récupération de toutes les présences
router.get('/', attendanceController.getAttendances);
// supprision de toutes les présences  DELETE /api/attendances/all   
router.delete('/all', attendanceController.deleteAllAttendances);
// Ajoutez ici d'autres routes pour la création, la mise à jour, et la suppression

module.exports = router;
