const express = require('express');
const router = express.Router();
const Middlewares = require('../middlewares/authMiddleware');
const dashBoardController = require('../controllers/dashBoardController');

router.get('/stats', Middlewares.authMiddleware,dashBoardController.getDashboardStats);
router.get('/recent', Middlewares.authMiddleware,dashBoardController.getDashboardRecent);
router.get('/monthly', Middlewares.authMiddleware, dashBoardController.getDashboardMonthly);

module.exports = router;