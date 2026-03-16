const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');

router.post('/ask', chatbotController.ask);
router.post('/symptom-check', chatbotController.symptomCheck);

module.exports = router;
