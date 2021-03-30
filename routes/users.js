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
const fs = require('fs').promises;

const usersJsonPath = path.join(__homedir, './users.json');

router.route('/').get(async (req, res) => {
    let users = Object.values(JSON.parse(await fs.readFile(usersJsonPath, 'utf-8')));
    if (req.query.name) {
        users = users.filter(user => user.name.includes(req.query.name));
    }

    if (req.query.limit) {
        users = users.slice(0, Number(req.query.limit));
    }

    res.json({
        success: true,
        data: users
    });
}).post(upload.single('image'), async (req, res) => {
    try {
        const users = JSON.parse(await fs.readFile(usersJsonPath, 'utf-8'));
        if (users[req.body.username]) {
            throw new Error('User exists');
        } else {
            users[req.body.username] = {
                username: req.body.username,
                name: req.body.name,
                image: req.file.path
            };
            await fs.writeFile(usersJsonPath, JSON.stringify(users));
            res.json({
                success: true,
                data: users[req.body.username],
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

router.route('/:username').get(async (req, res) => {
    const users = JSON.parse(await fs.readFile(usersJsonPath, 'utf-8'));
    if (users[req.params.username]) {
        res.json({
            success: true,
            data: users[req.params.username]
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
        const users = JSON.parse(await fs.readFile(usersJsonPath, 'utf-8'));
        const user = users[req.params.username];
        if (user) {
            user.name = req.body.name;
            await fs.unlink(path.join(__homedir, user['image']));
            user.image = req.file.path;
            await fs.writeFile(usersJsonPath, JSON.stringify(users));
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
        const users = JSON.parse(await fs.readFile(usersJsonPath, 'utf-8'));
        if (users[req.params.username]) {
            delete users[req.params.username];
            await fs.writeFile(usersJsonPath, JSON.stringify(users));
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
