// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var User = require("../models/users.js");

// Routes
// =============================================================
module.exports = function(app) {
  
  // Search for email & pswd from login screen then provide JSON result back to client
  	// this should come from the client ... 
  	// http://localhost:8080/api/login/abreaw@hotmail.com/PCBrea
  app.get("/api/login/:email/:pswd", function(req, res) {
    
    var user_email = req.params.email;
    var user_pswd = req.params.pswd;

    console.log("email = " + user_email);
    console.log("pswd = " + user_pswd);

    // Query user model to check user email & pswd coming from the client side
    User.findOne({
    	where: {
    		user_email: user_email,
    		user_pswd: user_pswd
    	}
    }).then(function(result) {

    	// if error ... return error to client
    	if (result === null) {

    		var error = {
    			msg: "User / Password Not Valid",
    			data: result
    		}

    		console.log("error for api login");

    		return error;
    	} 
    	else {
	    	// if not error ... return user profile information
	    	console.log("result for api login route");
	    	console.log(result);

	    	// result looks like this ...
	    	// {
	    	//     "id": 1,
	    	//     "user_email": "abreaw@hotmail.com",
	    	//     "user_name": "Brea Torres",
	    	//     "user_pswd": "PCBrea",
	    	//     "createdAt": "2018-01-24T19:52:52.000Z",
	    	//     "updatedAt": "2018-01-24T19:52:52.000Z"
	    	// }
	    	return res.json(result);
	    }
    });

  });

  // Add user from the sign up page then provide result back to client
  	// this should come from the client 
  	// JSON object w/ signup data
	//     "email": "abreaw@hotmail.com",
	//     "name": "Brea Torres",
	//     "pswd": "PCBrea",
  app.post("/api/signup", function(req, res) {
    
    var user_info = req.body;

    console.log(req.body);

    console.log("email = " + req.body.email);
    console.log("name = " + user_info.name);

    // Query user model to check user email & pswd coming from the client side
    User.create({
    	user_email: user_info.email,
    	user_pswd: user_info.pswd,
    	user_name: user_info.name

    }).then(function(result) {

   		console.log("create api signup added a new user");
   		console.log(result);

    });

  });

 };
