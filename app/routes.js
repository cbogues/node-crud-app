// create a new express router

const express= require('express'),
	router = express.Router(),
	mainController = require('./controllers/mainController'),
	matchupsController = require('./controllers/matchupsController');


// export router
module.exports = router;


//define routes
//main routes
router.get('/', mainController.showHome);

//event routes
router.get('/matchups', matchupsController.showMatchups);

// seed matchups
router.get('/matchups/seed', matchupsController.seedMatchups);

//create matchups
router.get('/matchups/create', matchupsController.showCreate);
router.post('/matchups/create', matchupsController.processCreate);

//edit matchups
//delete matchups

// show a single matchup
router.get('/matchups/:slug', matchupsController.showSingle);
