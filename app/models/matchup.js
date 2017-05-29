const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

	// create schema
	const matchupSchema = new Schema({
		name: String,
		slug: {
			type: String,
			unique: true
		},
		description: String
	});

	// middleware ================
	// make sure the slug is created from the name
	matchupSchema.pre('save', function(next) {
		this.slug = slugify(this.name);
		next();
	});

	// create the model
	const matchupModel = mongoose.model('Matchup', matchupSchema);

	// export the model
	module.exports = matchupModel;

	// function to slugify a name
	function slugify(text) {
		return text.toString().toLowerCase()	
			    .replace(/\s+/g, '-')           // Replace spaces with -
			    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
			    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
			    .replace(/^-+/, '')             // Trim - from start of text
			    .replace(/-+$/, '');            // Trim - from end of text

	}
