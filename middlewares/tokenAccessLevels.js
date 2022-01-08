const jwt = require('jsonwebtoken');
const { secretKey } = require("../config");
const errors = require('../errors');
module.exports = function (acceptableRoles) {
    return function (req, res, next) {
        try {
            const [type, token] = req.headers.authorization.split(" ");
            if (!token) {
                return res.status(401).json({ message: "Not authorized" });
            }
            const { roles } = jwt.verify(token, secretKey);
            let isUserHaveRights = false;
            roles.forEach(role => {
                if (acceptableRoles.includes(role)) isUserHaveRights = true;
            });
            if (!isUserHaveRights) return res.status(403).json(errors[403]);
            next();
        }
        catch (e) {
            res.status(401).json({ message: "Not authorized" });
        }
    }
}