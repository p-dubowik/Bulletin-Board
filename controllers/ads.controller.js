const Ad = require('../models/Ad.model');

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
        const ad = await Ad.findById(req.params.id);
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
        const newAd = await new Ad({ 
            title, 
            text
        });
        await newAd.save();
        
        res.json(newAd);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
};

exports.edit = async (req, res) => {
    try {
        //less required data for now
        const { title, text } = req.body;

        const ad = await Ad.findById(req.params.id);
        if(ad){
            await Ad.updateOne({ _id: req.params.id }, {title: title, text: text})
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not Found...' });
    }
    catch(err) {
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





