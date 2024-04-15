const express = require('express');
const router = express.Router();
const planningController = require('../controllers/planning.controller'); // Make sure the path matches the location of your controller file

router.post('/', planningController.createPlanningWithJours);

// Correct the paths for other HTTP methods as well, they should be relative to '/api/plannings'
router.get('/', planningController.getAllPlannings);
router.get('/:id', planningController.getPlanningById);
router.put('/:id', planningController.updatePlanning);
router.delete('/:id', planningController.deletePlanning);

module.exports = router;

