const homework = require('../homeworks/homework22/task1');
const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
    homework.emit('request', res);
});

module.exports = router;
