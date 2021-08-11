let assert = require("assert");
let greetFactory = require("../greeting");

describe("The greeting factory function" , function(){
    it("should count names greeted" , function(){
        let greeting = greetFactory();
        greeting.nameVal("Nzwakie");
        greeting.nameVal("Buhle");
        greeting.nameVal("Vhonani");
        greeting.nameVal("Cinga");
        greeting.nameVal("Jodie");
        greeting.nameVal("Onele");
        assert.equal(6, greeting.getCounter());
    });

    it("should be able to set the user's name" , function(){
        let greeting = greetFactory();

        greeting.setName("Nzwakie");
        assert.equal("Nzwakie" ,greeting.getName("Nzwakie"));

        greeting.setName("Buhle");
        assert.equal("Buhle" ,greeting.getName("Buhle"));
    });

    it("should be able to set the language" , function(){
        let greeting = greetFactory();
        greeting.setLanguage("english");
        assert.equal("english" ,greeting.getLanguage("english"));

        greeting.setLanguage("isixhosa");
        assert.equal("isixhosa" ,greeting.getLanguage("isixhosa"));

        greeting.setLanguage("afrikaans");
        assert.equal("afrikaans" ,greeting.getLanguage("afrikaans"));
    });

    it("should take user's name and language selected(english) and greet the person in that language when greet button is clicked" , function(){
        let greeting = greetFactory();
        greeting.setName("Nzwakie");
        greeting.setLanguage("english");
        assert.equal("Hello, Nzwakie" ,greeting.greetingMsg());
    });

    it("should take user's name and language selected(isixhosa) and greet the person in that language when greet button is clicked" , function(){
        let greeting = greetFactory();
        greeting.setName("Onele");
        greeting.setLanguage("isixhosa");
        assert.equal("Molo, Onele" ,greeting.greetingMsg());
    });

    it("should take user's name and language selected(afrikaans) and greet the person in that language when greet button is clicked" , function(){
        let greeting = greetFactory();
        greeting.setName("Yonela");
        greeting.setLanguage("afrikaans");
        assert.equal("Goeie môre, Yonela" ,greeting.greetingMsg());
    });

    it("should check for duplicates" , function(){
        let greeting = greetFactory();
        greeting.nameVal("Nzwakie");
        greeting.nameVal("Nzwakie");
        assert.equal(1, greeting.getCounter());
    });

    // it("should get the names greeted in local storage" , function(){
    //     let greeting = greetFactory();
    //     greeting.nameVal("Nzwakie");
    //     greeting.nameVal("Linamandla");
    //     assert.deepEqual({ nzwakie: 0, linamandla: 0 },greeting.getNameGreeted());
    // });
});





