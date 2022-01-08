const User = require("./models/User");
const Role = require("./models/Role");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { secretKey } = require("./config")
// const error = require("./errors");

function generateWebToken(id, roles) {
    const payload = {
        id, roles
    }

    return jwt.sign(payload, secretKey, { expiresIn: "24h" })
}
/**
 * Represents a REST API ROUTES HANDLER.
 * @constructor
 */
class AuthHandler {
    /**
 * Represents a book.
 * @constructor
 * @param {object} req - The title of the book.
 * @param {object} res - The author of the book.
 */
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ message: `User ${username} not found` });
            }
            const isValidPassword = bcrypt.compareSync(password, user.password);
            if (!isValidPassword) {
                return res.status(400).json({ message: `Invalid password` });
            }
            const token = generateWebToken(user._id, user.roles);
            return res.json({ token });
        }
        catch (e) {
            res.status(400).json({ message: "Login error" });
        }

    }
    async register(req, res) {
        try {
            const { username, password } = req.body;
            const candidate = await User.findOne({ username });
            if (candidate) {
                return res.status(400).json({ message: `Username ${username} is busy,try something else` });
            }
            const cryptedPass = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({ value: "USER" });
            const newUser = new User({ username, password: cryptedPass, roles: [userRole.value] });
            await newUser.save();
            return res.json({ message: "Thanks for register!" })
        }
        catch (e) {
            res.status(400).json({ message: "Register error" });
        }

    }
    async changeUserRights(req, res) {
        try {
            const { username, role } = req.body;
            const candidate = await User.findOne({ username });
            const userRole = await Role.findOne({ value: role });
            if (!candidate) {
                return res.status(400).json({ message: `User ${username} is not finded` });
            }
            if (!userRole) {
                return res.status(400).json({ message: `Role ${role} is not defined` });
            }
            await User.updateOne({ username }, { roles: [role] });
            return res.json({ message: "Succesfully updated!" })
        } catch (e) {
            res.status(400).json({ message: "Rights changing error" });
        }

    }
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new AuthHandler();