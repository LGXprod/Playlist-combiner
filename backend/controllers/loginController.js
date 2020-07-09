const { Op } = require("sequelize");

module.exports = (app, User) => {
    app.post("/login", function(req, res) {
        const username = req.body.username;
        const password = req.body.password;
    
        async function checkCredentials() {
            const user = await User.findAll({
                where: {
                    username: {
                        [Op.eq]: username
                    }, 
                    password: {
                        [Op.eq]: password
                    }
                }
            });

            if (user.length == 1) return true;

            return false;
        }

        (async () => {
            if (await checkCredentials()) {
                res.json({
                    auth: true
                });
            } else {
                res.json({
                    auth: false
                });
            }
        })();
    });
}