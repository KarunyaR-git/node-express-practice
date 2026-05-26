function logger(req, res, next) {
    const date = new Date();
    console.log(req.method, req.url, date.getHours().toString().padStart(2, "0") + ":"+ date.getMinutes().toString().padStart(2, "0") + ":" + date.getSeconds().toString().padStart(2, "0"));
    next();
}

module.exports = logger;