require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import the CORS module
const app = express();

// Import routers
const userRouter = require("./api/users/user.router");
const empRouter = require("./api/employee/employee.router");
const filesupload = require("./api/filesupload/filesupload.router");
const login = require("./api/auth/login.router");
const employee = require("./api/employee/employee.router");
const attend = require("./api/attend/employeeAttendance.router");
const employeeList = require("./api/employeeList/employeeList.router");
const leave = require("./api/leave/leave.router");
const datafetchRouter = require("./api/datafetch/datafetch.router");
const report = require("./api/userReport/userReport.router");
const UserData = require("./api/UserData/UserData.router");
const dashboard = require("./api/dashboard/dashboard.router");
const task = require("./api/task/task.router");
const project = require("./api/project/project.router");
const comment = require("./api/comment/comment.router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use CORS middleware
app.use(cors());

app.use("/uploads", express.static("uploads"));
app.use("/api/users", userRouter);
app.use("/api/employee", empRouter);
app.use("/api/filesupload", filesupload);
app.use("/api/login", login);
app.use("/api/emp", employee);
app.use("/api/attend", attend);
app.use("/api/employeeList", employeeList);
app.use("/api/leave", leave);
app.use("/api/datafetch", datafetchRouter);
app.use("/api/report", report);
app.use("/api/userDetail",UserData);
app.use("/api/dashboard",dashboard);
app.use("/api/task",task);
app.use("/api/project",project);
app.use("/api/comment",comment);

const port = process.env.APP_TYPE === "prod" ? process.env.PORT : 3000;

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});