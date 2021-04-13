const User = require('../models/users');
const FriendRequest = require('../models/friend-request');
const Bcrypt = require('../managers/bcrypt');
const AppError = require('../managers/app-error');
const TokenManager = require('../managers/token-manager');

class UsersCtrl {
    getById(id) {
        return User.findById(id);
    }

    findOne(options) {
        return User.findOne(options);
    }

    async getAll(data) {
        const options = {
            $and: []
        };
        options.$and.push({_id: {$ne: data.userId}});
        const limit = {};
        if (data.name) {
            options.$and.push({name: new RegExp(data.name, 'i')});
        }

        if (data.limit) {
            limit.limit = Number(data.limit);
        }

        return User.find(options, null, limit);
    }

    async add(data) {
        if (await User.exists({username: data.username})) {
            throw new Error('User exists');
        } else {
            const user = new User({
                email: data.email,
                name: data.name,
                image: data.file ? data.file.path : undefined,
                password: await Bcrypt.hash(data.password)
            });
            user.username = data.username;

            return user.save();
        }
    }

    update() {

    }

    delete() {

    }

    async friendRequest(data) {
        const {from, to} = data;
        if (!await User.findById(to)) {
            throw new AppError('User not found', 404);
        }
        if(await FriendRequest.findOne({from, to})){
            throw new AppError('Request is sent', 403);
        }
        return new FriendRequest({from, to}).save();
    }

    async getFriendRequests(data) {
        const {to} = data;

        return FriendRequest.find({to});
    }
}

module.exports = new UsersCtrl();
