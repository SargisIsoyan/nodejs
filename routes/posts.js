const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
    res.end('Read post');
}).post((req, res) => {
    res.end('Create Post');
}).put((req, res) => {
    res.end('Edit Post');
}).delete((req, res) => {
    res.end('Delete Post');
});

router.route('/:id').get((req, res) => {
    console.log(req.params);
    res.end('Method GET');
}).delete((req, res) => {
    //deleteFromDataBase(req.params.id);
    res.end('Method Delete');
});

module.exports = router;
