var express = require('express');
var router = express.Router();
const userControllers = require('../controllers/users')

/* GET users listing. */
router.get('/', userControllers.showAllUsers)
      .post('/', userControllers.createUser)
      .delete('/',userControllers.deleteUser);

module.exports = router;
