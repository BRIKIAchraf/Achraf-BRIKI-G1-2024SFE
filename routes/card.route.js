const express = require('express');
const router = express.Router();
const cardController = require('../controllers/card.controller');

router.post('/create', cardController.createCard);
router.patch('/assign', cardController.assignCardToEmployee);
router.delete('/delete/:cardId', cardController.deleteCard);

module.exports = router;
