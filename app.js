require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse request bodies
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

// CORS middleware
app.use(cors());

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static("uploads"));

// Import routers
const userRouter = require("./api/users/user.router");
const empRouter = require("./api/employee/employee.router");
const filesupload = require("./api/filesupload/filesupload.router");
const login = require("./api/auth/login.router");
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
const menu = require("./api/menu/menu.router");
const moduleset = require("./api/module/module.router");
const permission = require("./api/permission/permission.router");
const monthlyReport = require("./api/monthlyReport/monthlyReport.router");

// Define routes
app.use("/api/users", userRouter);
app.use("/api/employee", empRouter);
app.use("/api/filesupload", filesupload);
app.use("/api/login", login);
app.use("/api/attend", attend);
app.use("/api/employeeList", employeeList);
app.use("/api/leave", leave);
app.use("/api/datafetch", datafetchRouter);
app.use("/api/report", report);
app.use("/api/userDetail", UserData);
app.use("/api/dashboard", dashboard);
app.use("/api/task", task);
app.use("/api/project", project);
app.use("/api/comment", comment);
app.use("/api/menu", menu);
app.use("/api/module", moduleset);
app.use("/api/permission", permission);
app.use("/api/monthlyReport", monthlyReport);

// Determine port based on environment
const port = process.env.APP_TYPE === "prod" ? process.env.PORT : 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
