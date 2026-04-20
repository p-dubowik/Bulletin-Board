const { log } = require('console');
const Ad = require('../models/Ad.model');
const fs = require('fs');
const path = require('path');

const deleteFile = async (filePath) => {
    try {
        await fs.unlinkSync(filePath);
    }
    catch (err) {
        console.log('Error', err.message);
    }
}

exports.getAll = async (req, res) => {
    try {
        res.json(await Ad.find());
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id).populate('userInfo');
        if(!ad) res.status(404).json({ message: 'Not found...' });
        else res.json(ad);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
};

exports.newAd = async (req, res) => {
    try {
        console.log("SESSION:", req.session);
        console.log("USER:", req.session?.user);
        const {title, text, price, location} = req.body;

        if(
            !title || typeof title !== 'string' ||
            !text || typeof text !== 'string' ||
            !price || typeof price !== 'string' ||
            !location || typeof location !== 'string'
        ) {
            await deleteFile(path.join(__dirname, '../public/uploads', req.file.filename))
            return res.status(400).json({ message: 'Invalid Data'});
        }

        if(!req.file) {
            return res.status(400).json({ message: 'Image required' });
        }

        const fileType = ['image/png', 'image/jpeg', 'image/gif'];
        if(!fileType.includes(req.file.mimetype)) {
            return res.status(400).json({ message: 'Invalid File Type' });
        }

        if(!req.session?.user?._id) {
            if(req.file) {
                await deleteFile(path.join(__dirname, '../public/uploads', req.file.filename));
            }
            return res.status(401).json({ message: 'Not logged in' });
        }

        const newAd = new Ad({
            title,
            text,
            price,
            location,
            image: req.file.filename,
            userInfo: req.session.user._id,
            date: new Date().toISOString()
        });

        await newAd.save();

        console.log('4 ok')

    } catch (err) {
        if(req.file) {
            await deleteFile(path.join(__dirname, '../public/uploads', req.file.filename));
        }
        res.status(500).json({ message: err.message });
    }
};

exports.edit = async (req, res) => {
    try {
        //less required data for now
        const { title, text, price, location } = req.body;

        const ad = await Ad.findById(req.params.id);

        if(!ad){
            if(req.file) {
                await deleteFile(path.join(__dirname, '../public/uploads', req.file.filename));
            }
            return res.status(404).json({ message: 'Not Found...' });
        }

        const updated = {};

        if(title) updated.title = title;
        if(text) updated.text = text;
        if(price) updated.price = price;
        if(location) updated.location = location;

        if(req.file){
            updated.image = req.file.filename;

            fs.unlinkSync(path.join(__dirname, '../public/uploads', ad.image));
        }
        await Ad.updateOne({ _id: req.params.id }, updated);
        res.json({ message: 'OK' });
    }
    catch(err) {
        if(req.file) {
                await deleteFile(path.join(__dirname, '../public/uploads', req.file.filename));
            }
        res.status(500).json({ message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id);
        if(!ad) res.status(404).json({ message: 'Not Found...' });
        else {
            await Ad.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        }
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

exports.getBySearch = async (req, res) => {
    //placeholder
    res.json({ message: 'OK' });
};





