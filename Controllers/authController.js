const db = require('../db');

class authController {
    async registration(req, res) {
        try {
            const { name, login, email } = req.body;

            db.query(`INSERT INTO users (name, login, email) VALUES ("${name}", "${login}", "${email}")`, (error, results) => {
                if (error) throw error;
                res.send('User registered successfully!');
            });
        } catch (e) {
            console.log(e);
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            db.query(`SELECT * FROM users WHERE email = '${email}'`, (error, results) => {
                if (error) throw error;
                if (results.length > 0) {
                    // req.session.loggedin = true;

                    db.query(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`, (error, results) => {
                        if (error) throw error;
                        if (results.length > 0) {
                            // req.session.loggedin = true;
                            req.session.user = results[0];
                            res.redirect('/dashbord');
                            // res.send(req.session.userlogin);
                        } else {
                            res.send('Incorrect Username and/or Password!');
                            // res.redirect('../');
                        }
                    });



                    req.session.user = results[0];
                    res.redirect('/dashbord');
                    // res.send(req.session.userlogin);
                } else {
                    res.send('Incorrect Username and/or Password!');
                    // res.redirect('../');
                }
            });
        } catch (e) {
            res.send('Incorrect Username');
        }
    }

    async logout(req, res) {
        try {
            // res.send(req.session);
            const login  = req.session.user.login;
            // console.log(login);
            if(login){
                req.session.user = null;
                res.redirect('/');
            }
            else{
                res.send('There is no login in session!');
            }

        } catch (e) {
            console.log(e);
        }
    }

    async getUsers(req, res) {
        try {
            // res.send("ghjk");
            db.query('SELECT * FROM users', (error, results) => {
                if (error) throw error;
                res.send(results);
            });

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