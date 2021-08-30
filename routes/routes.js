const express = require('express');
const router = express.Router();
const SignupTable = require('../signupBackend/models/signupModels');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
	const saltPassword = await bcrypt.genSalt(10);
	const securePassword = await bcrypt.hash(req.body.password, saltPassword);

	const signedUpUser = new SignupTable({
		email: req.body.email,
		password: securePassword,
	});

	try {
		const data = await signedUpUser.save();
		res.json(data);
	} catch (err) {
		res.json(err);
	}
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;

	const userInfo = await SignupTable.findOne({ email }).catch((err) => {
		console.error(`Failed to find the matched email: ${err}`);
		res.redirect('/login');
	});

	await bcrypt.compare(password, userInfo.password).catch((err) => {
		console.error(`Failed to find the matched password: ${err}`);
		res.redirect('/login');
	});

	console.log('login successfully!');
	res.redirect('/login');
});

module.exports = router;
