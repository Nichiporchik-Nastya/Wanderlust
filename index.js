//npm start
//nodemon index.js


// const bcrypt = require('bcrypt');


// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');


const express = require('express');
const fileUpload = require('express-fileupload');
const PORT = process.env.PORT || 4002;


const app = express();
app.use(express.json());
app.use(fileUpload({}));

// app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use('/public', express.static('Public')); //дополнительный роутинг для статичных файлов

const session = require('express-session');

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

const authRouter = require('./Routers/authRouter');
const mainRouter = require('./Routers/mainRouter');

app.use("/auth", authRouter);
app.use("/", mainRouter);

app.get('/*', function (req, res) {
    res.status(404);
    const user = req.session.user;
    res.render('404', { data: user });
});


const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`server started on port ${PORT}`);
            // console.log(bcrypt.hash(123 + '123', 3));
        }

        );
    } catch (e) {
        console.log(e);
    }
}

start();

