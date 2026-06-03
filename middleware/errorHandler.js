function errorHandler (error, req, res, next) {
    console.log(error)
    if (error.name === 'ValidationError' || error.name === 'CastError') {
        return res.status(400).send('Invalid user data');
    }

    return res.status(500).send('Something went wrong');
}

module.exports = errorHandler;