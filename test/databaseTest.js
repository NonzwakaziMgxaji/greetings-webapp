const assert = require('assert');
const greetFactory = require('../greeting');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://nzwakie:Bokang2851!@localhost:5432/names_greeted';

const pool = new Pool({
    connectionString
});

describe('The greetings-webapp database', function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from users;");
    });

    it('should be able to set names and get them from database', async function () {
        let greeting = greetFactory(pool);
        await greeting.setName("Nzwakie");
        assert.deepEqual("Nzwakie", await greeting.namesGreeted())
    });

    it('should be able to count the names greeted in the database', async function () {
        let greeting = greetFactory(pool);
        await greeting.setName("Nzwakie");
        await greeting.setName("codex");
        assert.equal(2, await greeting.getCounter())
    });

    it('should test duplication in the database', async function () {
        let greeting = greetFactory(pool);
        await greeting.setName("Yonela");
        await greeting.setName("Yonela");
        assert.equal(1, await greeting.getCounter())
    });

    it("should be able to greet entered name in the language selected", function () {
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

    it('should be able to reset the database', async function(){
        let greeting = greetFactory(pool);
        await greeting.getNameList();
        assert.equal(0, await greeting.reset())
    });

    after(function () {
        pool.end();
    })
});