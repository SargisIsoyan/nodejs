const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: String,
    name: String,
    image: String,
    password: String,
    isActive: {type: Boolean, default: false}
}, {versionKey: false, timestamps: true});
UserSchema.set('collection', 'users');

module.exports = mongoose.model('User', UserSchema);
