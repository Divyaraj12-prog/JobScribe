const express = require('express');
const router = express.Router();
const appControllers = require('../controllers/applicationControllers');
const Middlewares = require('../middlewares/authMiddleware');

router.post('/', Middlewares.authMiddleware, appControllers.addApplicationController);
router.get('/', Middlewares.authMiddleware, appControllers.getAllApplicationsController);
router.get('/:id', Middlewares.authMiddleware, appControllers.getApplicationByIdController);
router.patch('/:id', Middlewares.authMiddleware, appControllers.updateApplicationController);
router.delete('/:id', Middlewares.authMiddleware, appControllers.deleteApplicationController);

module.exports = router;