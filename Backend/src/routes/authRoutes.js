const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');
const Middlewares = require('../middlewares/authMiddleware');

// Authentication Routes
router.post('/register', authControllers.registerController);
router.post('/login', authControllers.loginController);
router.get('/me', Middlewares.authMiddleware, authControllers.getMeController);
router.patch('/me', Middlewares.authMiddleware, authControllers.updateMeController);
router.post('/change-password', Middlewares.authMiddleware, authControllers.changePasswordController);
router.post('/logout', authControllers.logoutController);
router.delete('/delete', Middlewares.authMiddleware, authControllers.deleteAccountController);

module.exports = router;