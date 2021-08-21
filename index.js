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
const connectionString = process.env.DATABASE_URL || 'postgres://uqjpgztocqhgpx:b17656ff636fa9c2283049a4759703898d355dba901b4dbc80eed576109e00fc@ec2-54-159-35-35.compute-1.amazonaws.com:5432/dff5gcmvgia0d0';

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