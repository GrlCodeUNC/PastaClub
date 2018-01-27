var path = require("path");


// Routes
module.exports = function(app) {


  // index route loads welcome page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/welcome.html"));
  });

  // users are able to signup for app
//   app.get("/signup", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/signup.html"));
//   });

  // users dashboard is loaded
  app.get("/dashboard", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/dashboard.html"));
  });

// user wants to attend a meetup
  app.get("/attending", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/attending.html"));
  });

};