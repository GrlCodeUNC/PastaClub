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
  app.put("/api/login/:email/:google/:name", function(req, res) {
    
    var user_email = req.params.email;
	var user_google_token = req.params.google;
	var user_name = req.params.name;
	
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

			console.log(result[0]);
			// check if update worked
			if (result[0] === 0) {  // expect result to return # of rows affected by update query
				// if it didn't then send back that the user must be added (client needs to call signup route)

				// Query user model to check user email & pswd coming from the client side
				// db.Users.create({
					Users.create({
						user_email: user_email,
						user_name: user_name,
						user_google_token: user_google_token,
	
					}).then(function(result) {
	
						console.log("create api signup added a new user");
						console.log(result);
						return res.json(result);
	
					});
					return ("Google token ID updated in user table");
					return ("Need to add user to pasta club app list");
			}
			else {
				// if it did then nothing needed


				// return ("Google token ID updated in user table");
				return res.json(result);

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

  // Grab event data from the database for the email
	// this should come from the client ... 
	// http://localhost:8080/api/dashboard/<email>
  app.get("/api/dashboard/:email", function(req, res) {

  	console.log("dashboard api code started");
  	// console.log("getting information for user = " + req.params.userToken);

  	// grab user from client route params passed
	var google_token_id = req.params.userToken;

	// setup JSON object for response
	var eventsInfo = {
		userName: "",
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
			// user_google_token: google_token_id
			// user_id: req.params.userid
			user_email: req.params.email
    	}
    }).then(function(result) {

		// console.log(result);

		// id back from users table in DB
		console.log("user ID in table = ", result.dataValues.id);
		var userID = result.dataValues.id;
		eventsInfo.userName = result.dataValues.user_name;
		
		// get hosting events list
		Events.findAll({
			where: {
				userId: userID
			}
		}).then( function (eventData){
			
			console.log("Events that are being hosted");
			console.log(eventData.length);

			// check if there was any information returned from the findAll query
			// use length to find out if there is any data in the array
			if (eventData.length > 0) {

				// console.log(eventData);
				// console.log(eventData[0].dataValues.id);
				// console.log(eventData[0].dataValues.events_title);

				// Loop thru all the event Data that comes back from the query
				for (var i = 0; i < eventData.length; i++) {
					
					// add the evenData for hosting events to the EventsInfo array
					eventsInfo.hostingEvents.push(eventData[i].dataValues);
				}

				// console.log("Events that are being hosted");
				// console.log(eventsInfo.hostingEvents.length);
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
			}
			else { 
				// user does not have any events associated w/ their name in the events table
				console.log("no events being hosted by this user");
			}

		});

		// // get attending events list
		// Meetup.findAll({
		// 	where: {
		// 		userId: userID
		// 	},
		// 	include: [Events]
		// see if this one works for the join w/ user id
		Meetup.findAll({
			where: {
				userId: userID
			},
			include: [Events],
			group: Meetup.userId
		}).then( function (eventData){
			
			console.log("events that are being attended");

			// log the length of the eventData result from the findAll query
			console.log(eventData.length);
			
			// check if there was any information returned from the findAll query
				// use length to find out if there is any data in the array
			if (eventData.length > 0) {

				// the user is attending events
				// console.log(eventData);
				console.log(eventData.dataValues);
				// console.log(eventData[0].dataValues.id);
				// console.log(eventData[0].dataValues.comment_body);

				var currentEventId;

				// Loop thru all the event Data that comes back from the query
				for (var i = 0; i < eventData.length; i++) {
					
					// send only 1 of each event attending to the client (checking here)
					if (eventData[i].dataValues.eventId != currentEventId) {

						// add the eventData for attending events to the EventsInfo array
						eventsInfo.attendingEvents.push(eventData[i].dataValues.event);
						currentEventId = eventData[i].dataValues.eventId;
					}
					
				}
				
				// console.log(eventsInfo.attendingEvents.length);
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
				// return ("You are not signed up for any events currently");
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

		// next 3 events available (where user is not attending or hosting??)
		// see if this one works for the join w/ user id
		// Meetup.findAll({
		Events.findAll({
			where: {
				userId: {
					ne: userID
				}
			},
			// include: [Events]
		}).then( function (eventData){

			// Let's see what we get back from this join query
			console.log(eventData);

			// var currentEventId;

			if (eventData.length > 0) {
				
				// console.log(eventData[0].dataValues.id);
				// console.log(eventData[0].dataValues.comment_body);
				

				// Loop thru all the event Data that comes back from the query
				for (var i = 0; i < eventData.length; i++) {

					// send only 1 of each event attending to the client (checking here)
					// if (eventData[i].dataValues.eventId !== currentEventId) {

					// 	// add the eventData for attending events to the EventsInfo array
					// 	eventsInfo.upcomingEvents.push(eventData[i].dataValues.event);
					// 	currentEventId = eventData[i].dataValues.eventId;
					// }
					
					// add the evenData for hosting events to the EventsInfo array
					eventsInfo.upcomingEvents.push(eventData[i].dataValues);
				}
				
				// console.log(eventData.upcomingEvents[0]);
				console.log(eventsInfo.upcomingEvents.length);
			}
			else {

				// no event data being returned from the query
				console.log("no events available");
				var response = {
					error: "no events available",
					code: -1
				};

				// client side should get error message if no events exist
				return res.json(response);

				// return ("There are currently no events scheduled");
			}

			console.log("Object being returned to the client")
			// console.log(eventsInfo);
			// return eventsInfo;
			return res.json(eventsInfo);

		});

		// console.log("Object being returned to the client")
		// console.log(eventsInfo);
		// return eventsInfo;

	});

  });  // end of app.get for dashboard route call

  // Grab single event / meetup info to send to the client
	// this should come from the client ... 
	// http://localhost:8080/api/event/<event id>
  app.get("/api/event/:eventID", function(req, res) {

	console.log("single event api code started");
	console.log("getting information for event request = " + req.params.eventID);

	var eventInfo = {
		eventDetails: {},
		commentInfo: []
	};

	// grab data for the single event from Event Table
	// Query events model (table) to get data associated with event id
		// from the client side 
		// if event not in table then return error
	Events.findOne({
		where: {
			id: req.params.eventID
		},
		include: [Users]
	}).then(function(result, error) {
		// console.log(result.dataValues);
		console.log('RESULTS: ', result.dataValues)

		// check if there was data that was returned
		if (result.dataValues) {
			// add the evenData for this event to the eventInfo array
			eventInfo.eventDetails = result.dataValues;

			console.log(eventInfo.eventDetails);

			// get all the comments that are associated w/ the event id request
			Meetup.findAll({
				where: {
					eventId: req.params.eventID
				},
				include: [Users]
			}).then( function (eventData){

				// Let's see what we get back from this query
				// console.log(eventData);

				// check to see if any data comes back for this event id
				if (eventData.length > 0) {
					
					// data is available in the table add it to the object going back to the client
					// eventInfo.eventDetails = eventData.dataValues;
					console.log(eventData[0].dataValues.id);
					console.log(eventData[0].dataValues.comment_body);

					// Loop thru all the event Data that comes back from the query
					for (var i = 0; i < eventData.length; i++) {
						
						// add the evenData for hosting events to the EventsInfo array
						eventInfo.commentInfo.push(eventData[i].dataValues);
					}
					
					console.log(eventInfo.commentInfo[0]);
					console.log(eventInfo.commentInfo.length);

					// sends single event data back to the client for displaying
					console.log('sending response json')
					return res.json(eventInfo);

				}
				else {

					// no comments / items available for this event id requested
					console.log("no comments / items for this event");
					var response = {
						error: "no comments available",
						code: -1
					};
					return res.json(response);
				}

			});  // end meetup.findAll 
		
		} else {
			res.json("No event with id " + req.params.eventID)
		} // end if for checking for data back from findOne
	
	}); // end of events.findOne to grab the events info


  });  // end of app.get for single event / meetup info


  // Add single event / meetup info from the client to the events db
	// this should come from the client ... 
	// JSON object w/ token id, event title, event start/end, description
	// address, city, state, zip, host id
	app.post("/api/newevent", function(req, res) {

		console.log("create new event api code started");
		console.log("checking information from the client");
		console.log(req.body);

		// use data from the client req.body JSON object
		// dummy data to test create event below
		// var newEvent = {
		// 	title: "Pasta Time",
		// 	start: "2018-02-09 17:45:00",
		// 	end: "2018-02-09 19:59:00",
		// 	descr: "Pasta Time for all!  We will have a variety of pasta to choose from ... come dig in!",
		// 	street: "90210 Beverly Hills",
		// 	city: "Raleigh Town",
		// 	state: "NC",
		// 	zip: 27610,
		// 	userId: 3
		// };

		var created = new Date;
		var updated = new Date;

		console.log("dates = ", created, updated);

		// data being used from the Postman app
		var newEvent = {
			title: req.body.Title,
			start: new Date(req.body.Start),
			end: null,
			descr: req.body.Desc,
			street: req.body.Street,
			city: req.body.City,
			state: req.body.State,
			zip: req.body.Zip,
			userId: req.body.HostID
		};

		// check if end date / time was added
		if (req.body.End !== "") {

			newEvent.end = new Date(req.body.End);
		}

		console.log(newEvent);
		
		// call sequelize create function to add event to the database
		Events.create({

			// add new info from client to the 
			events_title: newEvent.title,
			events_start: newEvent.start,
			events_end: newEvent.end,
			events_desc: newEvent.descr,
			events_loc_street_add: newEvent.street,
			events_loc_city: newEvent.city,
			events_loc_state: newEvent.state,
			events_loc_zip: newEvent.zip,
			userId: newEvent.userId
			// createdAt: created,
			// updatedAt: updated

		}).then(function(result) {

			console.log("create api new event added a new event to the table");
			console.log(result);

			// check result to see if new event was added successfullly
			if (result.dataValues.id > 0 || result.dataValues.id != undefined) {
				// if success send back data for event to the client for single event page view???
				// return event id to be able to hit single event route w/ id
				return res.json(result.dataValues);
			}
			else {
				// if failure ... send error to the client for resolution
				console.log("error new event record not created");
				var response = {
					error: "error new event record not created",
					code: -1
				};
				return res.json(response);
			}

		}); // end of Events.create.then function

	}); // end of app.post new event route

	// Add meetup RSVP info from the client to the meetup db
		// this should come from the client ... 
		// JSON object w/ user id, event id, comments,
		// item being brought by user for event
	app.post("/api/RSVP", function(req, res) {

		console.log("create new RSVP for api code started");
		console.log(req.body);

		// call sequelize create function to add meetup to the database
		Meetup.create({

			// add new info from client to the meetup table
			comment_body: req.body.comment,
			event_item: req.body.item,
			userId: req.body.userId,
			eventId: req.body.eventId
			// createdAt: created,
			// updatedAt: updated

		}).then(function(result) {

			console.log("meetup RSVP attendee added to the db");
			// console.log(result);
			console.log(result);

			// get the latest comment that was posted to the DB for adding to the attendee list view on the current page
			Meetup.findOne({
				where: {
					id: result.dataValues.id
				},
				include: [Users]
			}).then( function (eventData){

				// Let's see what we get back from this query
				console.log(eventData);

				// check to see if any data comes back for this event id
				if (eventData.dataValues.id > 0 || eventData.dataValues.id != undefined) {
					
					// data is available in the table add it to the object going back to the client
					// eventInfo.eventDetails = eventData.dataValues;
					console.log(eventData.dataValues.id);
					console.log(eventData.dataValues.comment_body);

					// sends single event data back to the client for displaying
					console.log('sending response json')
					return res.json(eventData);

				}
				else {

					// no comments / items available for this event id requested
					console.log("no comments / items for this event");
					var response = {
						error: "no comments available",
						code: -1
					};
					return res.json(response);
				} // end if stmt checking if eventData has results

			});  // end meetup.findOne 

		});  // end meetup.create.then function


	}); // end of app.post RSVP route function

	// Grab user id to send to the client
	// this should come from the client ... 
	// http://localhost:8080/api/<email>
	app.get("/api/userid/:email", function(req, res) {

		console.log("single event api code started");
		console.log("getting information for event request = " + req.params.eventID);

		Users.findOne({
    	where: {
    		user_email: req.params.email
			}
		}).then(function(result) {

			// if no user matches in db ... return error to client
			if (result === null) {

				console.log("user not yet in pastaclub_db");

				var response = {
					error: "user needs to be added to db",
					code: -1
				};

				// client side should get error message and throw up modal for sign up request
				return res.json(response);
			} 
			else {
				// if user found ... need to update google token id for that user
				// return user profile information
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
	

};
