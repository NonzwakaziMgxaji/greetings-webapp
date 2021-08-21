const flash = require('express-flash');
const session = require('express-session');
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const greetFactory = require('./greeting');
const pg = require("pg");
const Pool = pg.Pool;

const app = express()

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars')

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
} 

// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgres://qybkymezjejbdp:4de994b921d5813c0322db4b75387839eb3c3dea1361ef03bb2f212b2f852a0a@ec2-35-168-145-180.compute-1.amazonaws.com:5432/d52u8u9sgitnef';

const pool = new Pool({
    connectionString,
    ssl : useSSL
});

const greeting = greetFactory(pool)


// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

app.get('/', async (req, res) => {
    res.render('index', {
        name: greeting.greetingMsg(),
        counter: await greeting.getCounter(),
    })
})

app.post("/greeting", async (req, res) => {
    try {
        if (req.body.name != "") {
            await greeting.setName(req.body.name)
             greeting.setLanguage(req.body.language),
             greeting.nameVal(req.body.name)
         }
         else {
             req.flash('warning', greeting.errors());
         }
     
         res.redirect("/")
    } catch (error) {
        console.log(error);
    }
})

//displays a list of all the users that have been greeted
app.get("/greeted", async (req, res) => {
    res.render("greeted", {
     userList: greeting.getNameList()
    })
    console.log(greeting.getNameList())
})


//shows how many times a user has been greeted
app.get("/counter/:name", (req, res) => {
    const currentName = req.params.name
    let userData = greeting.getNameGreeted(currentName)
    console.log(userData);

    res.render("counter", {
        userData
    })
})

const PORT = process.env.PORT || 3013

app.listen(PORT, () => {
    console.log("App is running at port " + PORT)
})