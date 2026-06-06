const jwt = require('jsonwebtoken')
function auth(req, res, next) {
    const secretKey = "familycare_secret";
    const authHeader = req.headers.authorization;
    const error = new Error('Unauthorized');
    error.statusCode = 401;
    if(authHeader){
        if(authHeader.startsWith('Bearer')){
            const token = authHeader.split(' ')[1];
            try {
                const verifiedUser = jwt.verify(token, secretKey);
                req.user = verifiedUser;
                next();
            } catch(err) {
                next(error);
            }
        } else {
            next(error);
        }
        
    } else {
        next(error);
    }
    
}

module.exports = auth;