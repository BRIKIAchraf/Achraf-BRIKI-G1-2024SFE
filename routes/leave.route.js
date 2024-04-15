const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leave.controller');

router.post('/assign', leaveController.assignLeave);
router.delete('/revoke/:leaveId', leaveController.revokeLeave);
router.put('/modify/:leaveId', leaveController.modifyLeave);
router.get('/list', leaveController.listLeaves);

module.exports = router;
