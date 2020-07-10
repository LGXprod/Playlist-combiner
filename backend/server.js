require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");

const loginController = require("./controllers/loginController");
const dashboardController = require("./controllers/dashboardController");

const playlistCombiner = express();

playlistCombiner.use(bodyParser.urlencoded({extended: true}));

playlistCombiner.listen(5000, () => console.log("Server running on port 5000"));

const sequelize = new Sequelize("playlist_combiner", "root", process.env.DB_PASSWORD, {
    host: "localhost",
    dialect: "mysql"
});

async function testDBConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }    
}

// testDBConnection();

// created a sequelize model (abstraction of an sql table) so I can later
// query the user table
const User = sequelize.define("user", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    spotify_info: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

playlistCombiner.get("/test", function(req, res) {
    res.send("worked");
});

loginController(playlistCombiner, User);
dashboardController.getUserInfo(playlistCombiner, User);