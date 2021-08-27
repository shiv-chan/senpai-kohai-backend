const express = require('express');
const app = express();
const cors = require('cors');
const basicAuth = require('express-basic-auth');
const port = 3001;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes/routes');

dotenv.config();

mongoose
	.connect(process.env.DATABASE_ACCESS, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log(`Connected to database!`);
	})
	.catch((err) => {
		console.error(`Failed to connect to database: ${err}`);
	});

app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routesUrls);

/*
app.use(
	basicAuth({
		users: { admin: 'adminpassword' },
		challenge: true,
	})
);

app.get('/signup', (req, res) => {
	res.send('signup');
});

app.get('/login', (req, res) => {
	res.send('login');
});

app.get('/forgot-password', (req, res) => {
	res.send('forgot password');
});

app.get('/reset-password', (req, res) => {
	res.send('reset password');
});
*/

app.listen(port, () => {
	console.log(`Listening to port ${port}...`);
});
