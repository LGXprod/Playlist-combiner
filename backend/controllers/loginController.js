module.exports = (app) => {
    app.post("/login", function(req, res) {
        const username = req.body.username;
        const password = req.body.password;
    
        res.send("worked");
    });
}