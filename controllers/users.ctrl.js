const User = require('../models/users');
const Bcrypt = require('../managers/bcrypt');
const AppError = require('../managers/app-error');
const TokenManager = require('../managers/token-manager');

class UsersCtrl {
    getById(id) {
        return User.findById(id);
    }

    findOne(options){
        return User.findOne(options);
    }

    getAll() {

    }

    async add(data) {
        if (await User.exists({username: data.username})) {
            throw new Error('User exists');
        } else {
            const user = new User({
                name: data.name,
                image: data.file?.path,
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
}

module.exports = new UsersCtrl();
