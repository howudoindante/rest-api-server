const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: [{ type: String, ref: 'Role' }]
}, { collection: "user" });
const User = mongoose.model('User', UserSchema);
module.exports = User;