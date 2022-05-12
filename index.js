//setting and requiring all dependencies
const port=process.env.PORT||8000;
const express=require('express');
const app=express();
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

const expressLayouts = require('express-ejs-layouts');
const cookieParser=require('cookie-parser');
const MongoStore=require('connect-mongo');
const sassMiddleware =require('node-sass-middleware');
const flash = require('connect-flash');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
//setting up middlewares for every app request
//1)to fetch decoded info
app.use(express.urlencoded());
//setting up the directories for refernce
app.use(express.static('./assets'));
//setting up the layouts to be used to preinform the server about res type for rendering
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
//now when type is known set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
//cookie parser to help the session stay connected
app.use(cookieParser());
app.use(session({
    name: 'banking-software',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    //to store the cookie even if the server restarts or is undergoing integrations
    store:MongoStore.create({
        mongoUrl: 'mongodb://localhost/Banking_devenv'
    })
}));
//passport inititalize after everything is set up so that just authenticate and respond that's it!
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});