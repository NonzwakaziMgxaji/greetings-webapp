module.exports = function greetFactory(pool) {
    var username;
    var radioBtn;
    var existingNames;
    var namesGreeted = existingNames || {};
    var error;

    async function namesGreeted(){
        namesGreeted = await pool.query("select distinct user_names from users");

    }

    async function setName(name) {
        username = name;
        var q = await pool.query('insert into users (user_names, greeting_counts) values($1, $2)', [username, 1])
    }

    // function errors() {
    //         if (!username && !radioBtn) {
    //             error = "Please enter a name in the textbox!vsbhjksdhufsdv"
    //         } else if (!username){
    //             error = "Pleadmjskb"
    //         } else if (!language){
    //             error = "Pleadmhjkllllljskb"
    //         } 
    //         return error;
    // }

    function getName() {
        if (username) {
            return username;
        }
    }

    function setLanguage(language) {
        radioBtn = language;
    }

    function getLanguage() {
        return radioBtn;
    }

    function greetingMsg() {
        if (getLanguage() === "english") {
            return "Hello, " + getName();
        }
        else if (getLanguage() === "afrikaans") {
            return "Goeie môre, " + getName();
        }
        else if (getLanguage() === "isixhosa") {
            return "Molo, " + getName();
        }
    }

    function nameVal(name) {
        name = name.toLowerCase();

        if (namesGreeted[name] === undefined) {
            namesGreeted[name] = 1;
        } else {
            namesGreeted[name]++;
        }
    }



   async function getCounter() {
        // var names = Object.keys(namesGreeted)
        // return names.length;
    var names = await pool.query("select distinct user_names from users")
    return names.rowCount;
    }

   
    async function getNameList() {

    var names = await pool.query("select distinct user_names from users")

    return names.rows;
    }

    async function reset(){
        var resetAll = await pool.query("delete from users")
        // counter.reset = () => names = 0;
        return resetAll;
    }

    function getNamesGreeted() {
        return namesGreeted;
    }

    async function getNameGreeted(name) {
        var numTimes = await pool.query("select count(*) from users where user_names=$1", [name])
        return {
            name,
            count: numTimes.rows[0].count
        }
    }

    return {
        setName,
        getName,
        setLanguage,
        getLanguage,
        greetingMsg,
        nameVal,
        getCounter,
        getNamesGreeted,
        // errors,
        getNameGreeted,
        reset,
        getNameList,
        namesGreeted
        
    }
}