require('dotenv').config()
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const Mongostore = require('connect-mongo');

const app = express();


//establish database
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', async () => {
  console.log('Connected to the Database');
});
db.on('error', err => console.log('Error ' + err));

//middleware
app.use(cors({
    origin: 'https://bulletin-board-zv3m.onrender.com',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: process.env.SESSION_SECRET, store: Mongostore.create(mongoose.connection), resave: false, saveUninitialized: false, cookie: { secure: true, sameSite: 'none' } }));

//Static files from react
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

//routes
app.use('/api', require('./routes/ads.routes'));
app.use('/api', require('./routes/users.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

//otherwise serve react app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

//404 on nonexistent
app.use((req, res) => {
    res.status(404).send({ message: 'Not found...' });
});

//Run server
app.listen(process.env.PORT || 8000, () => {
    console.log('Server running on port: 8000');
});