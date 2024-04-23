const Router = require('express');
const router = new Router();
const controller = require('../Controllers/authController');
const { body } = require('express-validator');
const UserModel = require("../Models/userModel");

// router.post('/registration', [
//     body('name').not().isEmpty().withMessage('Заполните поле'),
//     body('email').isEmail().withMessage('Введите корректный адрес электронной почты'),
//     body('password').isLength({ min: 6 }).withMessage('Пароль должен содержать не менее 6 символов'),

//     body('email').custom(async (value, { req }) => {
//         let emailExist = await UserModel.getByEmail(value);
//         if (emailExist) {
//             throw new Error('Данная почта уже используется');
//         }
//         return true;
//     }),

//     body('password').custom(async (value, { req }) => {
//         let passwordCorrect = await UserModel.checkPasswordCorrect(req.body.email, value);
//         if (!passwordCorrect) {
//             throw new Error('Неверный пароль');
//         }
//         return true;
//     }),
//     body('secondPassword').custom(async (value, { req }) => {
        
//         if (body('password') != value) {
//             throw new Error('Пароли не совпадают');
//         }
//         return true;
//     }),
// ], controller.registration);

router.get('/registration', (req, res)=>{
    res.render('registrationPage');
});

router.post('/api/login', [
    body('email').isEmail().withMessage('Введите корректный адрес электронной почты'),
    body('password').isLength({ min: 6 }).withMessage('Пароль должен содержать не менее 6 символов'),

    body('email').custom(async (value, { req }) => {
        let emailExist = await UserModel.getByEmail(value);
        if (!emailExist) {
            throw new Error('Неверная почта');
        }
        return true;
    }),

    body('password').custom(async (value, { req }) => {
        let passwordCorrect = await UserModel.checkPasswordCorrect(req.body.email, value);
        if (!passwordCorrect) {
            throw new Error('Неверный пароль');
        }
        return true;
    }),
], controller.login);

router.get('/login', (req, res) => {
    res.render('loginPage');
});


router.get('/logout', controller.logout);
router.get('/users', controller.getUsers);
// router.get('/dashbord', controller.dashbord);



module.exports = router;