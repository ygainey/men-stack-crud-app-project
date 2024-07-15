//import modules
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require("connect-mongo");

//local imports
const isSignedIn = require('./middleware/is-signed-in.js');
const isAdmin = require('./middleware/is-admin.js')
const signInController = require('./controllers/sign-in.js');
const signUpController = require('./controllers/sign-up.js');

//set port
const port = process.env.PORT || 4000

//connect to DB
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () =>{
    console.log(`Connected to DB: ${mongoose.connection.name}`)
})

//middleware used through application
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
          mongoUrl: process.env.MONGODB_URI
        }) 
    })
)

//homepage
app.get('/', (req, res) =>{
    res.render('index.ejs')
})

//auth
app.use('/sign-in', signInController)
app.use(isSignedIn)
app.use(isAdmin)
//logged in routes
app.use('/sign-up', signUpController)

//generic 404 page
app.get('*', (req, res) => {
    res.render('404.ejs')
})

//listen
app.listen(port, () => {
    console.log(`Express app ready on ${port}`)
})