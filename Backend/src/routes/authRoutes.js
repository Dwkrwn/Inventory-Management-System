const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validate');
const { loginSchema, profileSchema, passwordSchema, themeSchema } = require('../validations/authValidation');

const router = express.Router();

router.post('/login', validate(loginSchema), authController.login);
router.post('/logout', authController.logout);

router.get('/profile', authMiddleware, authController.getProfile);
router.put('/profile', authMiddleware, validate(profileSchema), authController.updateProfile);
router.put('/profile/password', authMiddleware, validate(passwordSchema), authController.changePassword);
router.put('/profile/theme', authMiddleware, validate(themeSchema), authController.updateTheme);

module.exports = router;
