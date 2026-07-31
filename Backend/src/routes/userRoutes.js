const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const validate = require('../middleware/validate');
const {
  userSchema,
  userUpdateSchema,
  resetPasswordSchema,
} = require('../validations/masterValidation');

const router = express.Router();

router.use(authMiddleware);

router.get('/roles', roleAuth('admin'), userController.roles);
router.get('/', roleAuth('admin'), userController.index);
router.get('/:id', roleAuth('admin'), userController.show);
router.post('/', roleAuth('admin'), validate(userSchema), userController.store);
router.put('/:id', roleAuth('admin'), validate(userUpdateSchema), userController.update);
router.put('/:id/reset-password', roleAuth('admin'), validate(resetPasswordSchema), userController.resetPassword);
router.delete('/:id', roleAuth('admin'), userController.destroy);

module.exports = router;
