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
                    attributes: ["fName", "sName", "spotify_info"]
                }));
            })
        }

        queryDB().then((userInfo) => {
            console.log("x", userInfo)
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
    app.post("/saveSpotifyInfo", function(req, res) {
        console.log("x", req.body.spotify_info)
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