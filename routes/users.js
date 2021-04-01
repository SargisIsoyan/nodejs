//2. Ունենք users.json ֆայլ , այն սկզբում պարունակում է դատարկ օբյեկտ․
// Ոնենալ users route որի վրա կարելի է կատարել get և post request :
// post -ի body-ն պարունակելու է username, name, image դաշտերը։
// Post անելուց հետո users.json-ի պաունակությունը կարդալ ամբողյությամբ ,
// հետո այդ json-ի մեջ ավելացնել username key-ով օբյեկ ,
// որի մեջ կա username, name և image (image-ը save արած image-ի path-ն է, multer-ի միջոցով save անել) , հետո
// փոխել json-ի պարունակությունը և գրել users.json-ի մեջ։
// Նախքան ավելացնելը ստուգել եթե այս username-ով արդեն կա օբյեկ json ֆայլի մեջ , ապա վերադարձնել res.json()-ի մեջ {success: false, data: null, message: 'username is taken'}}, հակարակ դեպքում
// վերադարձնել success-ը true , data-ն ավելացված օբյետը , իսկ message-ը "user created" :
// Ոնենալ դինամիկ route 'users/:username' , որի վրա կարելի է կատարել get , delete մեթոդով request :
// get-ի դեպքում վերադարձնում է համապատասխան user-ի data-ն users.json ֆայլից ։
// delete-ի դեպքում ջնջում է user-ի data-ն users.json ֆայլից ։
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const path = require('path');
const {Types} = require('mongoose');
const fs = require('fs').promises;
const User = require('../models/users');

const usersJsonPath = path.join(__homedir, './users.json');

router.route('/').get(async (req, res) => {
    const options = {};
    const limit = {};
    if (req.query.name) {
        options.name = req.query.name;
    }

    if (req.query.limit) {
        limit.limit = Number(req.query.limit);
    }

    const users = await User.find(options, null, limit);
    res.json({
        success: true,
        data: users
    });
}).post(upload.single('image'), async (req, res) => {
    try {
        if (await User.exists({username: req.body.username})) {
            throw new Error('User exists');
        } else {
            const user = new User({
                name: req.body.name,
                image: req.file.path
            });
            user.username = req.body.username;

            await user.save();
            res.json({
                success: true,
                data: user,
                message: 'user created'
            });
        }
    } catch (e) {
        await fs.unlink(path.join(__homedir, req.file.path));
        res.json({
            success: false,
            data: null,
            message: e.message
        });
    }
});

router.route('/:id').get(async (req, res) => {
    // Types.ObjectId.isValid(req.params.id);
    const user = await User.findOne({_id: req.params.id});

    if (user) {
        res.json({
            success: true,
            data: user
        });
    } else {
        res.json({
            success: false,
            data: null,
            message: 'User not fond'
        });
    }
}).put(upload.single('image'), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        // await User.findOneAndUpdate({_id: req.params.id}, {
        //     name: req.body.name,
        //     image: req.file.path
        // });
        if (user) {
            await fs.unlink(path.join(__homedir, user.image));
            user.name = req.body.name;
            user.image = req.file.path;
            await user.save();
            res.json({
                success: true,
                data: user,
                message: 'user updated'
            });
        } else {
            throw new Error('User not found');
        }
    } catch (e) {
        await fs.unlink(path.join(__homedir, req.file.path));
        res.json({
            success: false,
            data: null,
            message: e.message
        });
    }
}).delete(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.remove();
            await fs.unlink(path.join(__homedir, user.image));
            res.json({
                success: true
            });
        } else {
            throw new Error('User Not Found');
        }
    } catch (e) {
        res.json({
            success: false,
            data: null,
            message: e.message
        });
    }
});


module.exports = router;
