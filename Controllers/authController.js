const UserModel = require("../Models/userModel");
const { validationResult } = require('express-validator');

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            else {
                let result = await UserModel.create(req.body);
                res.status(200).send(result);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async login(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            else {
                const { email, password } = req.body;
                req.session.user = await UserModel.getByEmail(email);

                return res.status(200).json({});
            }
        } catch (e) {
            res.send(e);
        }
    }

    async logout(req, res) {
        try {
            if (req.session.user) {
                req.session.user = null;
                let isSession = req.session.user ? true : false;
                res.render('index', { data: isSession });
            }
            else {
                let isSession = req.session.user ? true : false;
                res.render('index', { data: isSession });
            }
        } catch (e) {
            console.log(e);
        }
    }

    async getUsers(req, res) {
        try {

        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new authController();