const db = require('../db');

class middlewareController {

    async checkSession(req, res, next) {
        try {
            if (req.session.user) {
                db.query(`SELECT * FROM users WHERE id = "${req.session.user.id}"`, (error, results) => {
                    req.session.user = results[0];
                    if (error) throw error;
                    // res.send(results);
                });
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

            if (req.session.role == "ADMIN") {
                next();
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