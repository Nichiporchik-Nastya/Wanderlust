const UserModel = require("../Models/userModel");

class middlewareController {

    async checkSession(req, res, next) {
        try {
            if (req.session.user) {
                next();
            }
            else {
                res.redirect('/');
            }

        } catch (e) {
            console.log(e);
        }
    }

    async checkAdmin(req, res, next) {
        try {
            const { email } = req.session.user;
            let result = await UserModel.getRole(email);

            if (result == 1) {
                next();
            } 
            else if (result == 2) {
                res.redirect('/guide-dashbord');
            }
            else {
                res.redirect('/');
            }

        } catch (e) {
            console.log(e);
        }
    }

}

module.exports = new middlewareController();