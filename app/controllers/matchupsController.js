const Matchup = require('../models/matchup');

module.exports = {
	showMatchups: showMatchups,
	showSingle: showSingle,
	seedMatchups: seedMatchups,
	showCreate: showCreate,
	processCreate: processCreate,
	showEdit: showEdit,
	processEdit: processEdit,
	deleteMatchup: deleteMatchup
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
		res.render('pages/matchups', {
				matchups: matchups,
				success: req.flash('success')
			});

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


			res.render('pages/single', { 
				matchup: matchup,
				success: req.flash('success')
			 });

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
		/**
		 *
		 * Show the create form
		 */
		function showCreate(req, res) {
			res.render('pages/create', {
				errors: req.flash('errors')
			});
		}

		/**
		 * Placeholder for the process creation form
		 */
		
		function processCreate(req, res) {
			//validate information
			req.checkBody('name', 'Name is required.').notEmpty();
			req.checkBody('description', 'Description is required.').notEmpty();

			//if there are errors, redirect and save errors to flash
			const errors = req.validationErrors();
			if (errors) {
				req.flash('errors', errors.map(err => err.msg));
				return res.redirect('/matchups/create');
			}

			// create a new Matchup
			const matchup = new Matchup({
				name: req.body.name,
				description: req.body.description
			});
			// save the matchup
			matchup.save((err) => {
				if (err)
					throw err;

			// set a successful flash message
			req.flash('success', 'Successfully created event!');
				

				//redirect to the newly created matchup
				res.redirect(`/matchups/${matchup.slug}`);
			});
		}

		/** 
		 * Show the edit form
		 */
		function showEdit(req, res) {
			Matchup.findOne({ slug: req.params.slug }, (err, matchup) => {
				res.render('pages/edit', {
					matchup: matchup,
					errors: req.flash('errors')
				});
			});
		}

		/**
		 * Process the edit form
		 */
		function processEdit(req, res) {
			//validate information
			req.checkBody('name', 'Name is required.').notEmpty();
			req.checkBody('description', 'Description is required.').notEmpty();

			//if there are errors, redirect and save errors to flash
			const errors = req.validationErrors();
			if (errors) {
				req.flash('errors', errors.map(err => err.msg));
				return res.redirect(`/matchups/${req.params.slug}/edit`);
			}

		// finding a current event
		Matchup.findOne({ slug: req.params.slug }, (err, matchup) => {
			// updating that event
			matchup.name = req.body.name;
			matchup.description = req.body.description;

			matchup.save((err) =>{
				if (err)
					throw err;


			//success flash message
			//redirect back to the /events 
				req.flash('success', 'Successfully updated matchup.');
				res.redirect('/matchups');
			});
		});
	
	}

	/**
	 * Delete an event
	 */
	 function deleteMatchup(req, res) {
	 	Matchup.remove({ slug: req.params.slug  }, (err) => {
	 		// set flash data
	 		// redirect to the matchups page
	 		req.flash('success', 'Matchup deleted!');
	 		res.redirect('/matchups');
	 	});
	 }




		