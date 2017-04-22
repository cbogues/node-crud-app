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
		}

	};