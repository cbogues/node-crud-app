const Matchup = require('../models/matchup');

module.exports = {
	showMatchups: showMatchups,
	showSingle: showSingle,
	seedMatchups: seedMatchups
}


	// show all events
		function showMatchups(req, res) {
		//get all matchups
		Matchup.find({}, (err, matchups) => {
			if (err) {
				res.status(404);
				res.send('Matchups not found!');
			}

		// return a view with data
		res.render('pages/matchups', {matchups: matchups});

		});

	}

		// show a single event
		function showSingle(req, res) {
			// get a single matchup
			
			Matchup.findOne({slug: req.params.slug }, (err, matchup) => {
				if (err) {
					res.status(404);
					res.send('Matchups not found!');
				}


			res.render('pages/single', { matchup: matchup });

			});
 		
		}


		// seed the database
		 function seedMatchups(req, res) {
			//create some matchups
			const matchups = [
			{ name: 'East 1 vs 8', description: 'Celtics vs Bulls'},
			{ name: 'West 1 vs 8', description: 'GSW vs Portland'},
			{ name: 'West 2 vs 7', description: 'Spurs vs Grizzlies'},
			{ name: 'East 2 vs 7', description: 'Cavs vs Pacers'}

			];

			// use the Matchup model to insert and save
		
		Matchup.remove({}, () => {
			for (matchup of matchups) {
				var newMatchup = new Matchup(matchup);
				newMatchup.save();
			}
		});
			//seeded!
			res.send('Database seeded!');
		}