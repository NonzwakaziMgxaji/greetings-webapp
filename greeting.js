module.exports = () => {
    let namesGreeted = []
    let username
    let counter = 0

    const setName = (name) => {
        username = name.toLowerCase().trim()
    }

    const getName = () => {
        return username
    }

    const setNamesGreeted = (namesGreetedInput) => {
        namesGreeted = namesGreetedInput
    }

    const userExists = () => {
        if(!namesGreeted.includes(username)){
            namesGreeted.push(username)
        }
        return namesGreeted
    }

    const greetCount = () => {
        counter = namesGreeted.length
        return counter
    }

    return {
        setName,
        getName,
        setNamesGreeted,
        userExists, 
        greetCount
    }
}