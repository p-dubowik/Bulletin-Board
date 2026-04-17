const Ad = require('../models/Ad.model');
const fs = require('fs');
const path = require('path');

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
     try{
        const { title, text } = req.body;

        const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
        //validate all attributes
        if(!title || typeof title !== 'string' || 
            !text || typeof text !== 'string' || 
            !req.file || !['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
        ) {
            //if file exists delete it
            if(req.file){
                fs.unlinkSync(path.join(__dirname, '../public/uploads', req.file.filename));
            }
            return res.status(400).json({ message: 'Bad request'});
        }

        const newAd = new Ad({ 
            title, 
            text,
            image: req.file.filename
        });
        await newAd.save();
        
        res.json(newAd);
    }
    catch(err) {
        if(req.file){
                fs.unlinkSync(path.join(__dirname, '../public/uploads', req.file.filename));
            }
        res.status(500).json({ message: err.message });
    }
};

exports.edit = async (req, res) => {
    try {
        //less required data for now
        const { title, text } = req.body;

        const ad = await Ad.findById(req.params.id);

        if(!ad){
            if(req.file) {
                fs.unlinkSync(path.join(__dirname, '../public/uploads', req.file.filename));
            }
            return res.status(404).json({ message: 'Not Found...' });
        }

        const updated = {
            title,
            text
        };

        if(req.file){
            updated.image = req.file.filename;

            fs.unlinkSync(path.join(__dirname, '../public/uploads', ad.image));
        }
        await Ad.updateOne({ _id: req.params.id }, updated);
        res.json({ message: 'OK' });
    }
    catch(err) {
        if(req.file) {
                fs.unlinkSync(path.join(__dirname, '../public/uploads', req.file.filename));
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





