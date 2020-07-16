const { Op } = require("sequelize");

module.exports = (app, User) => {
    app.post("/login", function(req, res) {
        const username = req.body.username;
        const password = req.body.password;
    
        async function checkCredentials() {
            const user = await User.findAll({
                where: {
                    username: {
                        // Op.eq explicitly tells sequelize its a equality comparison
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

        // calls and waits for the result of the above async function
        // returns return or false depending on if the user had the correct credentials
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