//load environment variables
// var Promise = require("bluebird");
require('dotenv').config();

// for mongoose library
const mongoose = require('mongoose')
mongoose.Promise = global.Promise // <--
const Schema = mongoose.Schema
const UserSchema = new Schema({
  name: String,
})
const User = mongoose.model('user', UserSchema)
module.exports = User;


// grab dependencies
const express  = require('express'),
	app = express(),
	port = process.env.PORT || 8080,
	expressLayouts = require('express-ejs-layouts'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	cookieParser = require('cookie-parser'),
	flash = require('connect-flash');




// configure application =================
// set sessions and cookie parser
app.use(cookieParser());
app.use(session({
	secret: process.env.SECRET,
	cookie: { maxAge: 60000 },
	resave: false, // forces the session to be saved back to the store
	saveUninitialized: false // dont save unmodified session

}));
app.use(flash());

// tell express where to look for static assets
app.use(express.static(__dirname + '/public')); 


//set ejs as the templating engine engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

// conncect to database ====================
mongoose.connect(process.env.DB_URI);

// use body parser to grab info from a form
app.use(bodyParser.urlencoded({ extended: true }));



// set routes   ===================
// app.get('/', function(req, res) {
// 	res.send('Hello, I am the app!');
// });

app.use(require('./app/routes'));

//     CONVERT TO THE ES6 WAY    
// app.get('/', (req, res) => {
// 	res.send("Hello, I am the app!");
// });


// start server ======================
app.listen(port, () =>  {
	console.log(`App listening on http://localhost:${port}`);
});