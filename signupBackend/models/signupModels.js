const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Signup = mongoose.model('Signup', signupSchema);

module.exports = Signup;
