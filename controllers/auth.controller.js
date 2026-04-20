const User = require('../models/User.model');
const Session = require('../models/Session.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');
const path = require('path');

exports.register = async (req, res) => {
    try {

        const { login, password, phone } = req.body;
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

            if(!login || typeof login !== 'string' || 
                !password || typeof password !== 'string' || 
                !req.file || !['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
                    if(req.file) {
                        fs.unlinkSync(path.join(__dirname, '../public/uploads', req.file.filename));
                    }
                    return res.status(400).send({ message: 'Bad request'});
                }

                const userWithLogin = await User.findOne({ login });

                if(userWithLogin){
                    if(req.file){
                        fs.unlinkSync(path.join(__dirname, '../public/uploads', req.file.filename));
                    }
                    return res.status(409).send({message: 'User already exists'});
                }

        const user = await User.create({ login, password: await bcrypt.hash(password, 10), phone: phone, avatar: req.file.filename });
        res.status(201).send({ message: 'User created ' + user.login});
        
    }
    catch (err) {
        if(req.file){
            fs.unlinkSync(path.join(__dirname, '../public/uploads', req.file.filename));
        }
        res.status(500).send({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        console.log("SET-COOKIE HEADER:", res.getHeader('set-cookie'));
        const { login, password } = req.body;

        if(
            login && typeof login === 'string' && 
            password && typeof password === 'string'
        ) {
            const user = await User.findOne({ login });
            if(!user) {
                return res.status(400).send({ message: 'Login or password is incorrect' });
            }
            else {
                if(bcrypt.compareSync(password, user.password)) {
                    req.session.user = {
                        login: user.login,
                        _id: user._id
                    };

                    req.session.save(err => {
                        if(err) {
                            return res.status(500).json({ message: err.message });
                        }
                    })
                    res.status(200).json({ _id: user._id, login: user.login });
                }
                else {
                    return res.status(400).send({ message: 'Login or password is incorrect' });
                }
            }
        }
        else {
            res.status(400).send({ message: 'Bad request' });
        }
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getUser = async (req, res) => {
    if(req.session.user) {
        res.json(req.session.user)
    } else {
        res.status(401).send({ message: 'Not logged in '});
    }
};

exports.logout = async (req, res) => {

    try {
        if(process.env.NODE_ENV !== 'production'){
            await Session.deleteMany({});
        }
        req.session.destroy((err) => {
            if(err) {
                return res.send(err.message);
            }
        });
        res.status(200).send('Logged out')
    }
    catch(err) {
        res.status(500).send({ message: err.message });
    }
}