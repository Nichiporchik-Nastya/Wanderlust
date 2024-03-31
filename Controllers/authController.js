const UserModel = require("../Models/userModel");
const {validationResult} = require('express-validator');

class authController {
    // async registration(req, res) {
    //     try {
    //         const { name, login, email } = req.body;

    //         db.query(`INSERT INTO users (name, login, email) VALUES ("${name}", "${login}", "${email}")`, (error, results) => {
    //             if (error) throw error;
    //             res.send('User registered successfully!');
    //         });
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

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
                // let emailExist = await UserModel.checkExistingEmails(email);
                // if (emailExist) {
                //     let passwordCorrect = await UserModel.checkPasswordCorrect(email, password);
                //     if (passwordCorrect) {
                        req.session.user = await UserModel.getByEmail(email);
                        res.redirect('/dashbord');
                //     }
                //     else {
                //         res.send("неверный пароль");
                //     }
                // }
                // else {
                //     res.send("неверная почта");
                // }

                // let result = await UserModel.create(req.body);
                // res.status(200).send(result);
            }
        } catch (e) {
            // res.send(e);
            console.log(e);
            // consle.log('Не верно указаны почта и/или пароль');
        }
    }

    async logout(req, res) {
        try {
            // res.send(req.session);
            const login = req.session.user.login;
            // console.log(login);
            if (login) {
                req.session.user = null;
                res.redirect('/');
            }
            else {
                res.send('There is no login in session!');
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

    // async dashbord(req, res) {
    //     try {
    //         res.send("dashbord.html");

    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
}

module.exports = new authController();