const eish = require('../greeting');
var greetm = eish()
module.exports = function routes(greetFactory) {

    async function home(req, res, next) {
        try {
            res.render('index', {
                message: greetFactory.greetingMsg(),
                counter: await greetFactory.getCounter(),
            })
        }
        catch (err) {
            console.log(err);
        }
    };

    async function messageAndError(req, res, next) {
        try {
            if (req.body.name && req.body.language) {
                await greetFactory.setName(req.body.name)
                greetFactory.setLanguage(req.body.language)
            }
            else if (!req.body.name && !req.body.language) {
                req.flash('warning', "Please enter name and select language");
            } else if (!req.body.name) {
                req.flash('warning', "Please enter name in the textbox below");
            } else if (!req.body.language) {
                req.flash('warning', "Please select language of choice");
            }
            res.redirect("/")

        } catch (error) {
            console.log(error);
        }
    };

    async function greetedList(req, res, next) {
        try {
            var namesList = await greetFactory.getNameList()
            res.render("greeted", {
                userList: namesList
            })
        }
        catch (error) {
            console.log(error);
        }
    };

    async function greetingCount(req, res) {
        try {
            const currentName = req.params.name
            let greetCount = await greetFactory.getNameGreeted(currentName)
            res.render("counter", {
                currentName,
                greetCount
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    async function reset(req, res, next) {
        try {
            var resetAll = await greetFactory.reset();
            // await pool.query("truncate users")
            res.redirect("/")
        }
        catch (error) {
            console.log(error);
        }
    }

    return {
        home,
        messageAndError,
        greetedList,
        greetingCount,
        reset,
    }
}
