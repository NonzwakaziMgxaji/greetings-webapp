module.exports = function greetFactory(existingNames) {

    var namesGreeted = existingNames || {};

    function getCounter() {
        var names = Object.keys(namesGreeted)
        return names.length;
    }

    function setGreeting(name, checkedRadioBtn) {
        if (checkedRadioBtn === "english") {
            return "Hello, " + name;
        }
        else if (checkedRadioBtn === "afrikaans") {
            return "Goeie môre, " + name;
        }
        else if (checkedRadioBtn === "isixhosa") {
            return "Molo, " + name;
        }
    }

    function nameVal(name) {
        name = name.toLowerCase();

        if (namesGreeted[name] === undefined) {
            namesGreeted[name] = 0;
        } else {
            namesGreeted[name]++;
        }
    }

    function getNameGreeted() {
        return namesGreeted;
    }

    return {
        getNameGreeted,
        setGreeting,
        getCounter,
        nameVal,
    }
}