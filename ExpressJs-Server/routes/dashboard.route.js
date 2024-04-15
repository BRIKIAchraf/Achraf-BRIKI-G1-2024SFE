// routes/dashboard.routes.js

const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');

router.get('/stats', dashboardController.getDashboardStats);

module.exports = router;
