const path = require('path');
const { validationResult } = require('express-validator');
const UserModel = require("../Models/userModel");
const ExcursionModel = require('../Models/excursionModel');



class mainController {
    async dashbord(req, res) {
        try {
            const user = req.session.user;
            res.render('adminPages/dashbord', { data: user });
        } catch (e) {
            console.log(e);
        }
    }

    async guideDashbord(req, res) {
        try {
            const user = req.session.user;
            res.render('./guideDashbord', { data: user });
        } catch (e) {
            console.log(e);
        }
    }

    async createExcursion(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            else {

                // console.log(req.body);

                let result = await ExcursionModel.create(req.body, req.files);
                res.status(200).send(result);

                

                // return res.status(200).json({});
            }




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