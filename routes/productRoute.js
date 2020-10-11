const { Router } = require('express');
const { product_index, product_create } = require('../controllers/productController');
const { authRequired } = require('../middlewares/authRequired');
const router = new Router();

router.get('/', product_index);
router.post('/create', authRequired, product_create);

module.exports = router;