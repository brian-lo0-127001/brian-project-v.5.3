const mysql = require('mysql');

const pool = mysql.createPool({
   connectionLimit: 10,
   host: "nnmeqdrilkem9ked.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
   user: "foy8gnstc655jd37",
   password: "jmtz3m5mc7yntln9",
   database: "a8383lbgvqcz7s7d"

});

module.exports = pool;
