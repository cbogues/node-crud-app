//load environment variables

require('dotenv').config();

// grab dependencies
const express  = require('express'),
	app = express(),
	port = process.env.PORT || 8080,
	expressLayouts = require('express-ejs-layouts'),
	mongoose = require('mongoose');


// configure application =================
// tell express where to look for static assets
app.use(express.static(__dirname + '/public')); 


//set ejs as the templating engine engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

// conncect to database ====================
mongoose.connect(process.env.DB_URI);

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