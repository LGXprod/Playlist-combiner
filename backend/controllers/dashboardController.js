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

        queryDB().then((userInfo) => res.json({
            fName: userInfo[0].fName,
            sName: userInfo[0].sName,
            spotify_info: userInfo[0].spotify_info
        }));
    });
}

module.exports = {
    getUserInfo: getUserInfo
}