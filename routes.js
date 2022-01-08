const Router = require('express')
const router = new Router();
const { check } = require("express-validator");
const { getAllUsers, register, login, changeUserRights } = require("./handle");
const tokenAccessLevels = require('./middlewares/tokenAccessLevels');

router.get("/users", tokenAccessLevels(["ADMIN"]), getAllUsers);
router.post("/register", [check("username", "Username required").notEmpty(), check("password", "Password min length must be 2 and not greater than 12 symbols").isLength({ min: 2, max: 12 })], register);
router.post("/login", login);
router.put("/changeRights", tokenAccessLevels(["ADMIN"]), changeUserRights);

module.exports = router;