const Session = require('../models/Session.model');



const authMiddleware = async (req, res, next) => {

    if(process.env.NODE_ENV !== 'production'){
        try {
    
            //find last session record
            const sessionRecord = await Session.findOne({});

            //if session not found return 401 status
            if(!sessionRecord){
                return res.status(401).send({ message: 'You are not authorized' });
            }

            //if session is found parse it and set user in req.session
            const sessionData = JSON.parse(sessionRecord.session);
            req.session.user = {
                id: sessionData.user.id,
                login: sessionData.user.login
            }
            next();
        }
        catch(err) {
            return res.status(401).send({ message: 'You are not authorized' });
        }
    }
    else {
        //if req.session && req.session.user && req.session.user.login
        if(req.session?.user?.login) {
            next();
        }
        else {
            res.status(401).send({ message: 'You are not authorized' });
        }
    }
};

module.exports = authMiddleware;