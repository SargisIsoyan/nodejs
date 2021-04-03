const express = require('express');
const router = express.Router();
const Posts = require('../models/posts');
const Users = require('../models/users');
const {body, check} = require('express-validator');
const {ObjectId} = require('mongoose').Types;
const ResponseManager = require('../managers/response-manager');
const AppError = require('../managers/app-error');
const validationResult = require('../middlewares/validation-result');

router.route('/').get(async (req, res) => {
    const posts = await Posts.find().populate({
        path: 'author',
        select: '-_id name username'
    });
    res.json(posts);
}).post(
    body('userId').custom((value, {req, res}) => {
        return ObjectId.isValid(value);
    }),
    check('title', 'titley chka').exists(),
    validationResult,
    async (req, res) => {
        const responseHandler = ResponseManager.getResponseHandler(res);

        try {
            //call controller function
            responseHandler.onSuccess({}, 'Post created');
        } catch (e) {
            responseHandler.onError(e);
        }
    });

router.route('/:id').get((req, res) => {
    console.log(req.params);
    res.end('Method GET');
}).delete((req, res) => {
    //deleteFromDataBase(req.params.id);
    res.end('Method Delete');
});

module.exports = router;
