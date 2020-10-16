const { Router } = require('express');
const { product_index, product_create, product_details, product_update } = require('../controllers/productController');
const { authRequired } = require('../middlewares/authRequired');
const router = new Router();

router.get('/', product_index);
router.post('/create', authRequired, product_create);
router.get('/:id', product_details);
router.patch('/:id', product_update);

module.exports = router;