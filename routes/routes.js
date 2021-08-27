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

module.exports = router;
