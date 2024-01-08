const {createPool} = require('mysql');

// const pool = createPool({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "demo",
//     connectionLimit: 10
// })

const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: "",
    database: process.env.MYSQL_DB,
  });


//   console.log(pool)
  

// pool.query(`select * from user`, function(err, result, fields) {
//     if (err) {
//         return console.log(err);
//     }
//     return console.log(result);
// })

module.exports = pool;