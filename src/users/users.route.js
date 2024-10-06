const express = require('express');
const router = express.Router();
const userController = require('./users.controller')

router.post('/',userController.userTasks);

module.exports = router;