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
const path = require('path')

//local imports
const isSignedIn = require('./middleware/is-signed-in.js');
const isAdminSignedIn = require('./middleware/is-admin.js')
const passUserToView = require('./middleware/pass-user-to-view.js');
const authController = require('./controllers/auth.js');
const routesController = require('./controllers/routes.js')
const adRoutesController = require('./controllers/adminRoutes.js')

//set port
const port = process.env.PORT || 4000

//connect to DB
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () =>{
    console.log(`Connected to DB: ${mongoose.connection.name}`)
})

//middleware used through application
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
          mongoUrl: process.env.MONGODB_URI
        }) 
    })
);
app.use(passUserToView);

//homepage
app.get('/', (req, res) =>{
    if(req.session.user){
        res.redirect('/index')
    }else {
        res.render('index.ejs')
    }
    
});

//auth
app.use('/auth', authController)
app.use(isSignedIn)
//logged in routes
app.use('/index', routesController)
app.use('/admin', adRoutesController)

 
//generic 404 page
app.get('*', (req, res) => {
    res.render('404.ejs')
})

//listen
app.listen(port, () => {
    console.log(`Express app ready on ${port}`)
})