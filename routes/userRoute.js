const {Router} = require('express');
const {signup_post, login_post, getCurrentUser } = require('../controllers/userController');
const router = Router();

router.post('/signup', signup_post);
router.post('/login', login_post);
router.post('/me',  getCurrentUser)
module.exports = router;