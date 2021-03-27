const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

router.route('/').get((req, res) => {
    res.end('Return all users list');
}).post(upload.single('image'), (req, res) => {
    res.status(400).json({
        success: true,
        data: {
            username: req.body.username
        }
    });
});

router.route('/:username').get((req, res) => {
    res.end('return ' + req.params.username + ' users data');
}).put((req, res) => {
    res.end('edit ' + req.params.username + ' users data');
}).patch((req, res) => {
    res.end('edit ' + req.params.username + ' one field from users data');
}).delete((req, res) => {
    res.end('delete ' + req.params.username + ' users data');
});


module.exports = router;
