const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    value: { type: String, unique: true, default: "USER" }
}, { collection: "roles" });
const Role = mongoose.model('Role', RoleSchema);
module.exports = Role;