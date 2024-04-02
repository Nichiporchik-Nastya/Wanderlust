const path = require('path');
const { validationResult } = require('express-validator');
const UserModel = require("../Models/userModel");



class mainController {
    async dashbord(req, res) {
        try {
            const user = req.session.user;
            res.render('adminPages/dashbord', { data: user });
        } catch (e) {
            console.log(e);
        }
    }

    async index(req, res) {
        try {
            res.render('index');
        } catch (e) {
            console.log(e);
        }
    }

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
}

module.exports = new mainController();