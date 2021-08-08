const mysql = require("mysql2");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node_js_test',
    password: ''
});

module.exports = pool.promise();

