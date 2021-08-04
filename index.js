const express = require('express')
const exphbs = require('express-handlebars')
const NamesGreeted = require('./greeting')
const LanguagePicker = require('./language')

const app = express()
const namesGreeted = NamesGreeted()
const languagePicker = LanguagePicker()

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath:  './views',
    layoutsDir : './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars')
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
    res.render('index', {
        name: namesGreeted.getName(),
        greetText: languagePicker.getGreetText(),
        namesList: namesGreeted.greetCount()
    })
})

app.post("/name", (req, res) => {
    namesGreeted.setName(req.body.name)
    languagePicker.setLanguage(req.body.language)
    languagePicker.setGreetText()
    namesGreeted.userExists()
    console.log(namesGreeted.greetCount())
    res.redirect("/")
})

app.post("/counter", (req, res) => {

})

const PORT = process.env.PORT || 3012

app.listen(PORT, () => {
    console.log("App is running at port " + PORT)
})