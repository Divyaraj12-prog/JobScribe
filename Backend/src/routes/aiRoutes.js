const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiControllers');
const Middlewares = require('../middlewares/authMiddleware');

router.post('/analyze-resume/:resumeId', Middlewares.authMiddleware, aiController.analyzeResumeController);

module.exports = router;