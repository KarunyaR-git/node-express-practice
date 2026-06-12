function allowRoles(roles) {
    return function(req, res, next) {
        if(roles.includes(req.user.role)) {
            return next();
        }
        const error = new Error('You do not have the required permission');
        error.statusCode = 403;
        return next(error);
    }
}

module.exports = allowRoles;