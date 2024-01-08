const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into user(id, name, email, address,city) values(?,?,?,?,?)`,
      [data.id, data.name, data.email, data.address, data.city],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getUsers: (callBack) => {
    // pool.getConnection(function(err, connection) {
    //   console.log('err',err);
    //   if (err) throw err; // not connected!
    //  console.log('connection',connection)
    //   // Use the connection
    //   connection.query('select from user', function (error, results, fields) {
    //     // When done with the connection, release it.
    //     connection.release();
    //     console.log('results====',results)
    //     // Handle error after the release.
    //     if (error) throw error;
    //     return callBack(null, results);
    //     // Don't use the connection here, it has been returned to the pool.
    //   });
    // });

    // pool.query('select from user', function (error, results, fields) {
    //   console.log('sssss',results);
    //   console.log('error',error);

    //   if (error) {
    //      callBack(null,error);
    //    }
    //    return callBack(null, results);
    //   console.log('The solution is: ', results[0].solution);
    // });

    pool.query(`select * from user`, (error, results, fields) => {
      if (error) {
        return callBack(null, error);
      }
      return callBack(null, results);
    });
  },
};
