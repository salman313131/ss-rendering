const mysql = require('mysql2')

const pool = mysql.createPool({
    host:'localhost',
    user: 'salman@786',
    database: 'node-component',
    password: 'jaan@123'
})

module.exports = pool.promise()