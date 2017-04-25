const Matchup = require('../models/matchup');

module.exports = {

	// show all events
	showMatchups: (req, res) => {
		// create dummy events
		const matchups = [
		{ name: 'East', slug: 'East', description: 'LeBron vs Everybody.'},
		{ name: 'West', slug: 'West', description: 'GSW vs Houston vs OKC vs San Antonio'},
		];


		//return a view with data 
		res.render('pages/matchups', { matchups: matchups});
		},

		// show a single event
		showSingle:(req, res) => {
			// get a single matchup
		
			const matchup = { name: 'East', slug: 'East', description: 'LeBron vs Everybody.'};
 		
			res.render('pages/single', {matchup: matchup});
		}


	};