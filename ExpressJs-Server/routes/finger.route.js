// routes/finger.route.js
const express = require('express');
const router = express.Router();
const fingerController = require('../controllers/finger.controller');

router.post('/user/:uid/enroll-finger', fingerController.enrollFinger);
router.get('/templates', fingerController.getTemplates);
router.get('/user/:uid/template/:fid', fingerController.getUserTemplate);
router.put('/user/:uid/template/:fid', fingerController.setUserTemplate);

module.exports = router;
