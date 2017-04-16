// grab dependencies
const express  = require('express'),
	app = express();
	port = process.env.PORT || 8080;

// configure application 

// set routes
// app.get('/', function(req, res) {
// 	res.send('Hello, I am the app!');
// });

app.use(require('./app/routes'));

//     CONVERT TO THE ES6 WAY    
// app.get('/', (req, res) => {
// 	res.send("Hello, I am the app!");
// });


// start server
app.listen(port, () =>  {
	console.log(`App listening on http://localhost:${port}`);
});