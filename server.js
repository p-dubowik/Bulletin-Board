const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const Mongostore = require('connect-mongo');

const app = express();


//establish database
mongoose.connect('mongodb://0.0.0.0:27017/BulletinBoard', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', async () => {
  console.log('Connected to the Database');
});
db.on('error', err => console.log('Error ' + err));

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'xyz567', store: Mongostore.create(mongoose.connection), resave: false, saveUninitialized: false }));

//Static files from react
app.use(express.static(path.join(__dirname, '/client/build')));

//routes
app.use('/api', require('./routes/ads.routes'));
app.use('/api', require('./routes/users.routes'));
app.use('/auth', require('./routes/auth.routes'));

//otherwise serve react app
app.get('/*', (req, res) => {
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