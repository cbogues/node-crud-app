// create a new express router

const express= require('express'),
	router = express.Router(),
	mainController = require('./controllers/mainController');
	matchupsController = require('./controllers/matchupsController');


// export router
module.exports = router;


//define routes
//main routes
router.get('/', mainController.showHome);

//event routes
router.get('/matchups', matchupsController.showMatchups);
router.get('/matchups/:slug', matchupsController.showSingle);

//create events
//edit events
//delete events