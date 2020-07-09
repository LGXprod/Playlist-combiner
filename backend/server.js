require("dotenv").config();
const express = require("express");

const playlistCombiner = express();

playlistCombiner.listen(5000, () => console.log("Server running on port 5000"));

playlistCombiner.get("/test", function(req, res) {
    res.send("worked");
})

playlistCombiner.post("/login", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    console.log("x")
    console.log(username)
    console.log(password)
});