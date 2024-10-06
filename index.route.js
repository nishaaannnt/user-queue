const express = require('express');
const router = express.Router();

router.use('/task',require('./src/users/users.route'));

module.exports = router;