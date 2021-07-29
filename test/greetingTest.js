let assert = require("assert");
let greetFactory = require("../greeting");

describe("The greeting factory function" , function(){
    it("should count names in the local storage" , function(){
        let greeting = greetFactory();
        greeting.nameVal("Nzwakie");
        greeting.nameVal("Buhle");
        greeting.nameVal("Vhonani");
        greeting.nameVal("Cinga");
        greeting.nameVal("Jodie");
        greeting.nameVal("Onele");
        assert.equal(6, greeting.getCounter());
    });

    it("should take in a user's language selected(English) and greet the person in that language when greet button is clicked" , function(){
        let greeting = greetFactory();
        assert.equal("Hello, Nzwakie" ,greeting.setGreeting("Nzwakie", "english"));
    });

    it("should take in a user's language selected(Afrikaans) and greet the person in that language when greet button is clicked" , function(){
        let greeting = greetFactory();
        assert.equal("Goeie môre, Buhle" ,greeting.setGreeting("Buhle", "afrikaans"));
    });

    it("should take in a user's language selected(Isixhosa) and greet the person in that language when greet button is clicked" , function(){
        let greeting = greetFactory();
        assert.equal("Molo, Linamandla" ,greeting.setGreeting("Linamandla", "isixhosa"));
    });

    it("should check whether the name is already in the local storage and stop incrementing the counter if it is there" , function(){
        let greeting = greetFactory();
        greeting.nameVal("Nzwakie");
        greeting.nameVal("Nzwakie");
        assert.equal(1, greeting.getCounter());
    });

    it("should get the names greeted in local storage" , function(){
        let greeting = greetFactory();
        greeting.nameVal("Nzwakie");
        greeting.nameVal("Linamandla");
        assert.deepEqual({ nzwakie: 0, linamandla: 0 },greeting.getNameGreeted());
    });
});