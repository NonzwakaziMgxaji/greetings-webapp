module.exports = function greetFactory(existingNames) {
    var username;
    var radioBtn;
    var namesGreeted = existingNames || {};
    var error;

    function setName(name) {
        username = name;
    }

    function errors() {
            if (!username) {
                error = "Please enter a name in the textbox!"
            }

            return error;
    }

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

    function getCounter() {
        var names = Object.keys(namesGreeted)
        return names.length;
    }

    function getNamesGreeted() {
        return namesGreeted;
    }

    function getNameGreeted(name) {
        return {
            name,
            count: namesGreeted[name]
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
        errors,
        getNameGreeted
        
    }
}