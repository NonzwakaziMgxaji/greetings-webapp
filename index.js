'use strict';

const flash = require('express-flash');
const session = require('express-session');
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const greetFactory = require('./greeting');
const routes = require('./routes/greetingRoutes');
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
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

// database connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://nzwakie:Bokang2851!@localhost:5432/names_greeted';

const pool = new Pool({
    connectionString,
    // ssl: {
    //     rejectUnauthorized: false,
    // }
});

const greeting = greetFactory(pool)
const greetRoutes = routes(greeting)

// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

//setup the handlers
app.get('/', greetRoutes.home);
app.post('/greeting', greetRoutes.messageAndError);
app.get('/greeted', greetRoutes.greetedList);
app.get('/counter/:name', greetRoutes.greetingCount);
app.post('/reset', greetRoutes.reset);

const PORT = process.env.PORT || 3013

app.listen(PORT, () => {
    console.log("App is running at port " + PORT)
})