var express = require('express');
var router = express.Router();

var usercon = require('../controllers/usercontroller');
var bookcon = require('../controllers/bookcontroller');
const { checkToken } = require('../middleware/checkToken');

router.post('/author', bookcon.createAuthor);
router.post('/post', bookcon.createPost);
router.get('/post', bookcon.getPost);
router.get('/author', bookcon.getAuthor);

router.post('/todo', usercon.createTodo);
router.get('/todo', checkToken, usercon.getTodo);
router.post('/login', usercon.loginTodo);

module.exports = router;
