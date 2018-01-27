// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
// var db = require("../models"); // couldn't get models to work ... required each model below instead
var Users = require("../models/users.js");
var Events = require("../models/events.js");
var Meetup = require("../models/meetup.js");

// Routes
// =============================================================
module.exports = function(app) {
  
  // Search for email & pswd from login screen then provide JSON result back to client
  	// this should come from the client ... 
	  // http://localhost:8080/api/login/<email>/<google token id>
	  
	// should we send everything needed to update or add to the user table??
  app.put("/api/login/:email/:google", function(req, res) {
    
    var user_email = req.params.email;
	var user_google_token = req.params.google;
	
	console.log(req.params);
	console.log(req.body);

    // console.log("email = " + user_email);
    // console.log("name = " + user_name);
    // console.log("google token id = " + user_google_token);

	// update user table with google token id from client
	// db.Users.update(
	Users.update(
		{
			user_google_token: user_google_token
		},
		{
			where: {
				user_email: user_email
			}
		}).then(function(result) {

			console.log(result);
			// check if update worked
			if (result !== 1) {  // expect result to return # of rows affected by update query
				// if it didn't then send back that the user must be added (client needs to call signup route)
				return ("Need to add user to pasta club app list");
			}
			else {
				// if it did then nothing needed
				return ("Google token ID updated in user table");
			}
		
		});

	// -----------------------------------------------------------------------------------
	// Dont think we need the find any longer ... just need the above code to update the
	// google id token in our users table / database
	// -----------------------------------------------------------------------------------
	// Query users model (table) to check user email coming from the client side
		// update the google token id when the email exists in the users table
		// if user not in table then add the information to the table
    // db.Users.findOne({
    // 	where: {
    // 		user_email: user_email
    // 	}
    // }).then(function(result) {

    // 	// if no user matches in db ... return error to client
    // 	if (result === null) {

    // 		console.log("user not yet in pastaclub_db");

	// 		// client side should get error message and throw up modal for sign up request
    // 		return ("need to add user");
    // 	} 
    // 	else {
	// 		// if user found ... need to update google token id for that user
	// 		// return user profile information
	//     	console.log("result for api login route");
	//     	console.log(result);

	//     	// result looks like this ...
	//     	// {
	//     	//     "id": 1,
	//     	//     "user_email": "abreaw@hotmail.com",
	//     	//     "user_name": "Brea Torres",
	//     	//     "user_pswd": "PCBrea",
	//     	//     "createdAt": "2018-01-24T19:52:52.000Z",
	//     	//     "updatedAt": "2018-01-24T19:52:52.000Z"
	//     	// }
	//     	return res.json(result);
	//     }
	// });
	// -----------------------------------------------------------------------------------

  });

  // Add user if they are not already in the users table when they sign in
  	// this should come from the client 
  	// JSON object w/ signup data
	//     "email": "abreaw@gmail.com",
	//     "name": "Brea Torres",
	//     "tokenID": "google1",
  app.post("/api/signup", function(req, res) {
    
    var user_info = req.body;

    console.log(req.body);

    console.log("email = " + req.body.email);
    console.log("name = " + user_info.name);

    // Query user model to check user email & pswd coming from the client side
	// db.Users.create({
	Users.create({
    	user_email: user_info.email,
		user_name: user_info.name,
		user_google_token: user_info.tokenID,

    }).then(function(result) {

   		console.log("create api signup added a new user");
		   console.log(result);
		   return result;

    });

  });

  // Grab event data from the database for the userID
	// this should come from the client ... 
	// http://localhost:8080/api/dashboard/<google token id>
  app.get("/api/dashboard/:userToken", function(req, res) {

  	console.log("dashboard api code started");
  	console.log("getting information for user = " + req.params.userToken);

  	// grab user from client route params passed
	var google_token_id = req.params.userToken;
	var eventsInfo = {
		hostingEvents: [],
		attendingEvents: [],
		upcomingEvents: []
	};

	// grab userID from User Table
	// Query users model (table) to get userId associated with google token coming 
		// from the client side 
		// if user not in table then return error
    Users.findOne({
    	where: {
    		user_google_token: google_token_id
    	}
    }).then(function(result) {

		// console.log(result);

		// id back from users table in DB
		console.log("user ID in table = ", result.dataValues.id);
		var userID = result.dataValues.id;
		
		// get hosting events list
		Events.findAll({
			where: {
				userId: userID
			}
		}).then( function (eventData){
			
			// console.log(eventData);
			console.log(eventData[0].dataValues.id);
			console.log(eventData[0].dataValues.events_title);

			// Loop thru all the event Data that comes back from the query
			for (var i = 0; i < eventData.length; i++) {
				
				// add the evenData for hosting events to the EventsInfo array
				eventsInfo.hostingEvents.push(eventData[i].dataValues);
			}

			console.log("Events that are being hosted");
			console.log(eventsInfo.hostingEvents.length);
			// console.log(eventsInfo.hostingEvents);
			// Data being added to hostingEvents array looks like this
			// [ { id: 5,
			// 	events_title: 'Spaghetti Feast',
			// 	events_start: 2018-02-20T18:30:00.000Z,
			// 	events_end: 2018-02-20T21:00:00.000Z,
			// 	events_desc: 'Join us for spaghetti night, bring a sauce or drink to share',
			// 	events_loc_street_add: '102 My House Lane',
			// 	events_loc_city: 'Raleigh',
			// 	events_loc_state: 'NC',
			// 	events_loc_zip: 27571,
			// 	createdAt: 2018-01-26T21:14:52.000Z,
			// 	updatedAt: 2018-01-26T21:14:52.000Z,
			// 	userId: 1 },
			//   { id: 7,
			// 	events_title: 'Pasta Luego',
			// 	events_start: 2018-04-20T18:30:00.000Z,
			// 	events_end: 2018-04-20T21:00:00.000Z,
			// 	events_desc: 'We are heading to Italy for a while to celebrate, bring a sauce or drink to share',
			// 	events_loc_street_add: '102 My House Lane',
			// 	events_loc_city: 'Raleigh',
			// 	events_loc_state: 'NC',
			// 	events_loc_zip: 27571,
			// 	createdAt: 2018-01-26T21:14:52.000Z,
			// 	updatedAt: 2018-01-26T21:14:52.000Z,
			// 	userId: 1 } ]

		});

		// get attending events list
		Meetup.findAll({
			where: {
				userId: userID
			}
		}).then( function (eventData){
			
			console.log("events that are being attended");

			// log the length of the eventData result from the findAll query
			console.log(eventData.length);
			
			// check if there was any information returned from the findAll query
				// use length to find out if there is any data in the array
			if (eventData.length > 0) {

				// the user is attending events
				// console.log(eventData);
				// console.log(eventData.dataValues);
				console.log(eventData[0].dataValues.id);
				console.log(eventData[0].dataValues.comment_body);

				// Loop thru all the event Data that comes back from the query
				for (var i = 0; i < eventData.length; i++) {
					
					// add the evenData for hosting events to the EventsInfo array
					eventsInfo.attendingEvents.push(eventData[i].dataValues);
				}
				
				console.log(eventsInfo.attendingEvents.length);
				// console.log(eventsInfo.attendingEvents);
				// Data being added to the Attending events array looks like this
				// [ { id: 5,
				// 	on_waitlist: false,
				// 	comment_body: 'Looking forward to it, bringing a bottle of red wine',
				// 	createdAt: 2018-01-26T22:39:17.000Z,
				// 	updatedAt: 2018-01-26T22:39:17.000Z,
				// 	eventId: 5,
				// 	userId: 4 },
				//   { id: 7,
				// 	on_waitlist: false,
				// 	comment_body: 'I love red wine! I will bring some merlot',
				// 	createdAt: 2018-01-26T22:39:17.000Z,
				// 	updatedAt: 2018-01-26T22:39:17.000Z,
				// 	eventId: 8,
				// 	userId: 4 } ]
			}
			else {

				// user does not have any events associated w/ their name in the meetup table
				console.log("no events being attended by this user");
				return ("You are not signed up for any events currently");
			}

		});

		// next 3 events available (where user is not attending or hosting??)
		// this doesn't work to add in attending events too
		// Events.findAll({
		// 	where: {
		// 		userId: {
		// 			ne: userID
		// 		}
		// 	}
		// 	// include: [Meetup]  // error happening here ... not able to do the join this way
		// }).then( function (eventData){

		// 	// Let's see what we get back from this join query
		// 	console.log(eventData);

		// });

		// see if this one works for the join w/ user id
		Meetup.findAll({
			where: {
				userId: {
					ne: userID
				}
			},
			include: [Events]
		}).then( function (eventData){

			// Let's see what we get back from this join query
			// console.log(eventData);

			if (eventData.length > 0) {
				
				console.log(eventData[0].dataValues.id);
				console.log(eventData[0].dataValues.comment_body);

				// Loop thru all the event Data that comes back from the query
				for (var i = 0; i < eventData.length; i++) {
					
					// add the evenData for hosting events to the EventsInfo array
					eventsInfo.upcomingEvents.push(eventData[i].dataValues);
				}
				
				console.log(eventsInfo.upcomingEvents[0]);
				// console.log(eventsInfo.upcomingEvents.length);
			}
			else {

				// no event data being returned from the query
				console.log("no events available");
				return ("There are currently no events scheduled");
			}

			console.log("Object being returned to the client")
			console.log(eventsInfo);
			return eventsInfo;

		});

		// console.log("Object being returned to the client")
		// console.log(eventsInfo);
		// return eventsInfo;

	});

  });

};
