function auth(req, res, next) {
    const token = req.headers.token;
    console.log(typeof(token));
    if(token === "123") {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
}

module.exports = auth;