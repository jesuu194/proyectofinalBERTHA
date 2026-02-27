const router = require('express').Router();
const ctrl = require('../controllers/product.controller');

router.post('/', ctrl.createProduct);
router.get('/', ctrl.getProducts);
router.get('/:id', ctrl.getProductById);
router.put('/:id', ctrl.updateProduct);
router.delete('/:id', ctrl.deleteProduct);

module.exports = router;
