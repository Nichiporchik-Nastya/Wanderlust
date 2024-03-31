const path = require('path');
const {validationResult} = require('express-validator');
const UserModel = require("../Models/userModel");



class mainController {
    async dashbord(req, res) {
        try {
            const login  = req.session.user.login;            
            // db.query(`SELECT * FROM users WHERE login = "${login}"`, (error, results) => {
            //     if (error) throw error;
            //     if (results.length > 0) {

            //         results = results[0];

            //         res.render('adminPages/dashbord', { data: results });

            //         // res.send(results);

            //     } else {
            //         res.send('cannot reach dashbord page');
            //         // res.redirect('/');
            //     }
            // });

        } catch (e) {
            console.log(e);
        }
    }

    async index(req, res) {
        try {
            // const login  = req.session.userlogin;
            // console.log(login);
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