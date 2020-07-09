require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const loginController = require("./controllers/loginController");

const playlistCombiner = express();

playlistCombiner.use(bodyParser.urlencoded({extended: true}));

playlistCombiner.listen(5000, () => console.log("Server running on port 5000"));

playlistCombiner.get("/test", function(req, res) {
    res.send("worked");
});

loginController(playlistCombiner);