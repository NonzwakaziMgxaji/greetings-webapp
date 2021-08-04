module.exports = () => {
    let greetText
    let language

    const setLanguage = (lang) => {
        language = lang
    }

    const getLanguage = () => {
        return language
    }

    const setGreetText = () => {
        if(getLanguage() == 'English') {
            greetText = 'Hello '
        }

        if(getLanguage() == 'Afrikaans') {
            greetText = 'Goeie môre  '
        }

        if(getLanguage() == 'IsiXhosa') {
            greetText = 'Molo '
        }
    }

    const getGreetText = () => {
        return greetText
    }


    return {
        setLanguage,
        getLanguage,
        setGreetText,
        getGreetText,
    }
}