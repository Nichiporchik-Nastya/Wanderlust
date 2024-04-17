//npm start
//nodemon index.js

const express = require('express');
const fileUpload = require('express-fileupload');
// const middlewareController = require('./Controllers/middlewareController');
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 4001;

const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');


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
    saveUninitialized: true
}));

const authRouter = require('./Routers/authRouter');
const mainRouter = require('./Routers/mainRouter');
app.use("/auth", authRouter);
app.use("/", mainRouter);






const start = () => {
    try {
        app.listen(PORT, () =>{
            console.log(`server started on port ${PORT}`);
            // console.log(bcrypt.hash(123 + '123', 3));
        }
            
        );
    } catch (e) {
        console.log(e);
    }
}

start();

