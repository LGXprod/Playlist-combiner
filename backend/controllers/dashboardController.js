const { Op } = require("sequelize");

function getUserInfo(app, User) {
    app.post("/userInfo", function(req, res) {
        function queryDB() {
            return new Promise((resolve, reject) => {
                resolve(User.findAll({
                    where: {
                        username: {
                            [Op.eq]: req.body.username
                        }
                    },
                    // only returns the below fields in the user table
                    attributes: ["fName", "sName", "spotify_info"]
                }));
            })
        }

        queryDB().then((userInfo) => {
            // only zero or one users will ever be returned from queryDB
            // as username is the pk in the user table so no 2 usernames will be the same
            if (userInfo.length == 1) {
                res.json({
                    fName: userInfo[0].fName,
                    sName: userInfo[0].sName,
                    spotify_info: userInfo[0].spotify_info,
                    userFound: true
                });
            } else {
                res.json({
                    userFound: false
                });
            }
        });
    });
}

function saveSpotifyInfo(app, User) {
    // updates a new user's spotify_info field (initially null) with the spotify api
    // data retrieved by the frontend
    app.post("/saveSpotifyInfo", function(req, res) {
        User.update({ spotify_info: req.body.spotify_info }, 
            { 
                where: {
                    username: {
                        [Op.eq]: req.body.username
                    }
                }
            });

        res.send({ spotifyInfoSaved: true });
    });
}

module.exports = {
    getUserInfo: getUserInfo,
    saveSpotifyInfo: saveSpotifyInfo
}