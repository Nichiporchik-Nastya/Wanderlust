const UserModel = require("../Models/userModel");
const { validationResult } = require('express-validator');

class authController {
    async registration(req, res) {
// console.log(req.body);
        try {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            else if (!req.files?.photos || Array.isArray(req.files?.photos)) {
                errors = [{ type: 'field', value: '', msg: 'Выберите 1 изображение', path: 'photos', location: 'body' }];
                return res.status(400).json({ errors: errors });
            }
            else if (Array.isArray(req.files?.photos)) {
                req.files?.photos.forEach(element => {
                    if (!element.mimetype.includes("image")) {
                        errors = [{ type: 'field', value: '', msg: 'Один или несколько файлов не являются изображениями', path: 'photos', location: 'body' }];
                        return res.status(400).json({ errors: errors });
                    }
                });
            }
            else if (!req.files?.photos.mimetype.includes("image")) {
                errors = [{ type: 'field', value: '', msg: 'Файл не является изображением', path: 'photos', location: 'body' }];
                return res.status(400).json({ errors: errors });
            }
            let result = await UserModel.create(req.body, req.files);
            res.status(200).send(result);
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
        let guides = await UserModel.getAllGuide();
        try {
            if (req.session.user) {
                req.session.user = null;
                let isSession = req.session.user ? true : false;
                res.render('index', { data: isSession, guides: guides});
            }
            else {
                let isSession = req.session.user ? true : false;
                res.render('index', { data: isSession, guides: guides});
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