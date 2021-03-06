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
router.get('/matchups/:slug/edit', matchupsController.showEdit);
router.post('/matchups/:slug', matchupsController.processEdit);

//delete matchups
router.get('/matchups/:slug/delete', matchupsController.deleteMatchup);

// show a single matchup
router.get('/matchups/:slug', matchupsController.showSingle);
