// employe.route.js
const express = require('express');
const {
  createEmploye,
  modifyEmploye,
  deleteEmploye,
  getEmployeById,
  getAllEmployes, 
  generateEmployeeReport
} = require('../controllers/employe.controller');
const router = express.Router();

router.get('/', getAllEmployes);  // GET /api/employes
router.get('/:id', getEmployeById);  // GET /api/employes/:id
router.post('/', createEmploye);  // POST /api/employes
router.put('/:id', modifyEmploye);  // PUT /api/employes/:id
router.delete('/:id', deleteEmploye);  // DELETE /api/employes/:id
router.get('/:id/generate-report', generateEmployeeReport);

module.exports = router;
