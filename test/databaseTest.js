const assert = require('assert');
const greetFactory = require('../greeting');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://nzwakie:Bokang2851!@localhost:5432/names_greeted';

// 'postgres://uqjpgztocqhgpx:b17656ff636fa9c2283049a4759703898d355dba901b4dbc80eed576109e00fc@ec2-54-159-35-35.compute-1.amazonaws.com:5432/dff5gcmvgia0d0
const pool = new Pool({
    connectionString
});

describe('The greetings-webapp database', function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from users;");
    });

    it('should be able to count the names greeted', async function () {
        let greeting = greetFactory(pool);
        await greeting.setName("Nzwakie");
        await greeting.setName("Nzwakie");
        assert.equal({}, await greeting.getNameGreeted())
    });

    it('should be able to count the names greeted', async function () {
        let greeting = greetFactory(pool);
        await greeting.setName("Nzwakie");
        await greeting.setName("codex");
        assert.equal(2, await greeting.getCounter())
    });

    // it('should pass the db test', async function(){
    //     let greeting = greetFactory(pool);
    //     await greeting.setName("Nzwakie");
    //     // await greeting.setName("codex");
    //     assert.equal("[
    //         {
    //           user_names: 'Nzwakie'
    //         }
    //       ]
    //       ", await greeting.getNameList())
    // });

    it("should be able to set the language", function () {
        let greeting = greetFactory();
        greeting.setLanguage("english");
        assert.equal("english", greeting.getLanguage("english"));

        greeting.setLanguage("isixhosa");
        assert.equal("isixhosa", greeting.getLanguage("isixhosa"));

        greeting.setLanguage("afrikaans");
        assert.equal("afrikaans", greeting.getLanguage("afrikaans"));
    });

    it("should be able to get the greeting from the selected language and entered name", function () {
        let greeting = greetFactory();
        greeting.setName("Nzwakie");
        greeting.setLanguage("english");
        assert.equal("Hello, Nzwakie", greeting.greetingMsg());

        greeting.setName("Yonela");
        greeting.setLanguage("afrikaans");
        assert.equal("Goeie môre, Yonela", greeting.greetingMsg());

        greeting.setName("Onele");
        greeting.setLanguage("isixhosa");
        assert.equal("Molo, Onele", greeting.greetingMsg());
    });

    // it('should pass the reset', async function(){
    //     // the Factory Function is called greetFactory
    //     let greeting = greetFactory(pool);
    //     await greeting.setName("Nzwakie");
    //     assert.equal(0, await greeting.reset())
    // });

    after(function () {
        pool.end();
    })
});