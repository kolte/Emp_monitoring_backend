require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const filesupload = require("./api/filesupload/filesupload.router");
const login = require("./api/auth/login.router");
const employee = require("./api/employee/employee.router");
const attend = require("./api/attend/employeeAttendance.router");
const leave = require("./api/leave/leave.router");

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/api/users",userRouter);
app.use("/api/filesupload",filesupload);
app.use("/api/login",login);
// app.use("/api/emp",employee);
app.use("/api/attend",attend);
app.use("/api/leave",leave);
app.listen(3000,()=>{
    console.log('server up and running',process.env.APP_PORT)
})