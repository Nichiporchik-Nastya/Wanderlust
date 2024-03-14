//npm start

const express = require('express');
const middlewareController = require('./Controllers/middlewareController');
const PORT = process.env.PORT || 4000;

const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json());

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

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
        app.listen(PORT, () =>
            console.log(`server started on port ${PORT}`)
        );
    } catch (e) {
        console.log(e);
    }
}

start();

