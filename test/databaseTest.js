const assert = require('assert');
const greetFactory = require('./greeting');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgres://uqjpgztocqhgpx:b17656ff636fa9c2283049a4759703898d355dba901b4dbc80eed576109e00fc@ec2-54-159-35-35.compute-1.amazonaws.com:5432/dff5gcmvgia0d0';

const pool = new Pool({
    connectionString
});

describe('The greetings-webapp database', function(){

    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from users;");
    });

    // it('should pass the db test', async function(){
        
    //     // the Factory Function is called CategoryService
    //     let greeting = greetFactory(pool);

    //     });

    

    // });

    after(function(){
        pool.end();
    })
});