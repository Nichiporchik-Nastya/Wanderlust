const Router = require('express');
const router = new Router();
const controller = require('../Controllers/authController');

router.post('/registration', controller.registration);

router.post('/login', controller.login);
router.get('/login', (req, res)=>{
    res.render('loginPage');
});


router.get('/logout', controller.logout);
router.get('/users', controller.getUsers);
// router.get('/dashbord', controller.dashbord);



module.exports = router;