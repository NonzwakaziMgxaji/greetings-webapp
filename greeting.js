module.exports = function greetFactory(pool) {
    var username;
    var radioBtn;

    async function setName(name) {
        username = name[0].toUpperCase() + name.slice(1);
        await pool.query('insert into users (user_names, greeting_counts) values($1, $2)', [username, 1])
    }

    function getName() {
        if (username) {
            return username;
        }
    }
    
    async function namesGreeted() {
   var x = await pool.query("select distinct user_names from users");
    return x.rows[0].user_names;  
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

    async function getCounter() {
        var names = await pool.query("select distinct user_names from users")
        return names.rowCount;
    }

    async function reset() {
        var resetAll = await pool.query("delete from users")
        return resetAll.rows;
    }

    async function getNameList() {
        var names = await pool.query("select distinct user_names from users")
        return names.rows;
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
        getCounter,
        namesGreeted,
        getNameGreeted,
        reset,
        getNameList,
    }
}