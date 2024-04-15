// Assuming CommonJS syntax
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Require the CORS library
const WebSocket = require("ws");
const http = require("http"); // This is the missing line
const employeRoutes = require('./routes/employe.route');
const planningRoutes = require('./routes/planning.route');
const attendanceRoutes = require('./routes/attendances.route');
const dashboardRoutes = require('./routes/dashboard.route');
const leaveRoutes = require('./routes/leave.route');
const fingerRoutes = require('./routes/finger.route');
const cardRoutes = require('./routes/card.route');
//const {auth} = require('express-openid-connect');
//require('dotenv').config();
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use(
  //auth({
    //authRequired: false,
   // auth0Logout: true,
  //})
//);
// routes
app.use('/api/employes', employeRoutes);
app.use('/api/plannings', planningRoutes);
app.use('/api/attendances', attendanceRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/fingers', fingerRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/cards', cardRoutes);
//app.use (auth(config)); 
//app.use("/", indexRouter);
// Root route
app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});
// Replace the hardcoded connection string with an environment variable
// mongoose

wss.on('connection', function connection(ws) {
  console.log('A client connected');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.on('close', function close() {
    console.log('A client disconnected');
  });

  ws.send('Welcome to the WebSocket server!');
});
mongoose
  .connect("mongodb://localhost:27017/PFE-Project")
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Connection failed!", error);
  });

