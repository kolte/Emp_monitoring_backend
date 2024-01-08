const pool = require("../../config/database");
const multer = require("multer");
const upload = multer({ dest: "public/" });
const express = require("express");

module.exports = {
  create: (data, callBack) => {
    console.log(data.files);
    let data123 = upload.array("files")
    return callBack(null,data123)
    // pool.query(
    //   `insert into Screenshote(id, img) values(?,?)`,
    //   [data.id, data.img],
    //   (error, results, fields) => {
    //     if (error) {
    //       console.log(error);
    //       callBack(error);
    //     }
    //     return callBack(null, results);
    //   }
    // );
  },

  
};
