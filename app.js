require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const filesupload = require("./api/filesupload/filesupload.router");

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/api/users",userRouter);
app.use("/api/filesupload",filesupload);
app.listen(3000,()=>{
    console.log('server up and running',process.env.APP_PORT)
})