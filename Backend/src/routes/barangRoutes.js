const express = require('express');
const barangController = require('../controllers/barangController');
const authMiddleware = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const validate = require('../middleware/validate');
const { barangSchema } = require('../validations/masterValidation');

const router = express.Router();

router.use(authMiddleware);

router.get('/', roleAuth('admin', 'staff', 'owner'), barangController.index);
router.get('/all', roleAuth('admin', 'staff', 'owner'), barangController.listSimple);
router.get('/:id', roleAuth('admin', 'staff', 'owner'), barangController.show);
router.post('/', roleAuth('admin'), validate(barangSchema), barangController.store);
router.put('/:id', roleAuth('admin'), validate(barangSchema), barangController.update);
router.delete('/:id', roleAuth('admin'), barangController.destroy);

module.exports = router;
