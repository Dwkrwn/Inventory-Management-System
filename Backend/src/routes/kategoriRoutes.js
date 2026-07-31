const express = require('express');
const kategoriController = require('../controllers/kategoriController');
const authMiddleware = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const validate = require('../middleware/validate');
const { kategoriSchema } = require('../validations/masterValidation');

const router = express.Router();

router.use(authMiddleware);

router.get('/', roleAuth('admin', 'staff', 'owner'), kategoriController.index);
router.get('/:id', roleAuth('admin', 'staff', 'owner'), kategoriController.show);
router.post('/', roleAuth('admin'), validate(kategoriSchema), kategoriController.store);
router.put('/:id', roleAuth('admin'), validate(kategoriSchema), kategoriController.update);
router.delete('/:id', roleAuth('admin'), kategoriController.destroy);

module.exports = router;
