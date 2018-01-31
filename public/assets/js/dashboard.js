
// processes code once document loads in the DOM
 $(document).ready(function(){

	// triggers modal for new event button
	$('.modal-trigger').leanModal();

	// added local storage items to grab info from welcome page
	var nameLS = localStorage.getItem("name");
	var emailLS = localStorage.getItem("email");
	console.log("email = " + emailLS);
	console.log("name = " + nameLS);

	// hardcoding name / email since my login not working properly :(
	// take this out for everyone else
	nameLS = "Brea Torres";
	emailLS = "abreaw@hotmail.com";
	
	//    var id = "tokenID 1";
	// get the user id associated with the email that the user logged in with
	$.get("/api/userid/" + emailLS, function (data) {

		console.log("grabbing the user id for the page to load dashboard info");
		console.log("user id = " + data.id);
		console.log("error returned? " + data.error);

		// check to see if user id returned from database
		if (data.id > 0 && data.error === undefined) {

			// add user id to local storage for usage outside of the dashboard page
			localStorage.setItem("userid", data.id);
			
			// get the dashboard information from the db for the display
			$.get("/api/dashboard/" + emailLS, function(data) {

				console.log("this is the dashboard.js on client");
				console.log(data);
			
				// grab user's first name from the data back from the DB
				var fullName = data.userName.split(" ");
				var firstName = fullName[0];

				// var userID = data.id;

				// reset plate text
				$("#plate").empty();

				// grab the name info to add to the plate heading
				if(!data) {
					$("#plate").append("<p> Your Plate </p>");
					$("#hostingDash").append("<p> Sorry for our mess")
				}
				else{
					$("#plate").append("<p>" + firstName + "'s Plate</p>");
				}

				console.log("# of hosting events = " + data.hostingEvents.length);
				console.log("# of attending events = " + data.attendingEvents.length);
				console.log("# of upcoming events = " + data.upcomingEvents.length);

				// get elements to add table data after
				var hostingList = $("#hostingDash h5:first"); // grabs the first h5 element in the hostingDash div
				var attendingList = $("#attendingDash h5:first"); // grabs the first h5 element in the attendingDash div

				// data.hostingEvents = []; // added to test else statement below

				// dynamically add data to the divs from the .get data
				// check to see if there is any events the user is hosting
				if (data.hostingEvents.length > 0) {

					// clearing out the div
					// can't clear div because button is in there already
					// $("#hostingDash").empty();
					console.log("building hosting events now");
					// put this above so the else statement can use it too
					// var hostingList = $("#hostingDash h5:first"); // grabs the first h5 element in the hostingDash div

					// create new table for the hosting event div
					var hostTable = $("<table></table>");
					hostTable.css("width", "100%"); // not sure that is the right syntax

					// create a heading table in the div
					var hostTableHeading = $("<tr></tr>");
					var hostTableHeadingTitle = $("<th></th>");
					hostTableHeadingTitle.text("Event Title");
					var hostTableHeadingDate = $("<th></th>");
					hostTableHeadingDate.text("Date");

					// add table heading elements to the each other
					hostTable.append(hostTableHeading); // adds heading to table
					hostTableHeading.append(hostTableHeadingDate); // adds date heading to th row
					hostTableHeading.append(hostTableHeadingTitle); // adds title heading to the th row

					// add table to hostingDash div
					// $("#hostingDash").append(hostTable);

					// loop through data for hosting table side if available
					for (i = 0; i < data.hostingEvents.length; i++) {
						
						// here is what we are getting back from db for hosting events
						console.log(data.hostingEvents[i]);	
						
						// create a row for the data
						var hostTableRow = $("<tr></tr>");
						hostTableRow.addClass("event_data"); // add class for onclick code
						hostTableRow.attr("id", data.hostingEvents[i].id); // add id for onclick code

						// create data elements for data
						// date info
						var hostTableDataEventDate = $("<td></td>");
						var hostTableDataEventDateLink = $("<a>");
						// get date info out of db format
						var event_start_info = data.hostingEvents[i].events_start.split("T");

						hostTableDataEventDate.text(event_start_info[0]);

						// title info
						var hostTableDataEventTitle = $("<td></td>");
						hostTableDataEventTitle.text(data.hostingEvents[i].events_title);

						// append data / rows to table
						hostTableRow.append(hostTableDataEventDate);
						hostTableRow.append(hostTableDataEventTitle);
						hostTable.append(hostTableRow);

						// append table data to div
						hostingList.after(hostTable); // insert(append) after the h5 tag
					
					} // end for loop to add hosting data
				}
				else {
					// if no hosting event data then put empty data into table
					hostingList.after("<i>You are not hosting any events yet<i><br><br>");

				} // end if statement for hosting data list

				// ------------------------------------------------------------------------
				// Attending div data now
				// ------------------------------------------------------------------------
								
				// check to see if there is any events the user is attending
				if (data.attendingEvents.length > 0) {

					console.log("building attending events now");
					
					// create new table for the attending event div
					var attendTable = $("<table></table>");

					// attendTable.css("width", "100%"); // not sure that is the right syntax

					// create a heading table in the div
					var attendTableHeading = $("<tr></tr>");
					var attendTableHeadingTitle = $("<th></th>").addClass("attendingTable");
					attendTableHeadingTitle.text("Event Title");
					var attendTableHeadingDate = $("<th></th>").addClass("attendingTable");

					attendTableHeadingDate.text("Date");

					// add table heading elements to the each other
					attendTable.append(attendTableHeading); // adds heading to table
					attendTableHeading.append(attendTableHeadingDate); // adds date heading to th row
					attendTableHeading.append(attendTableHeadingTitle); // adds title heading to the th row

					// loop through data for attending table side if available
					for (i = 0; i < data.attendingEvents.length; i++) {
						
						// here is what we are getting back from db for attending events
						console.log(data.attendingEvents[i]);	
						
						// create a row for the data
						var attendTableRow = $("<tr></tr>");
						attendTableRow.addClass("event_data"); // add class for onclick code
						attendTableRow.attr("id", data.attendingEvents[i].id); // add id for onclick code

						// create data elements for data
						// date info

						var attendTableDataEventDate = $("<td></td>").addClass("attendingTable");

						var attendTableDataEventDateLink = $("<a>");
						// get date info out of db format
						var event_start_info = data.attendingEvents[i].events_start.split("T");

						attendTableDataEventDate.text(event_start_info[0]);

						// title info

						var attendTableDataEventTitle = $("<td></td>").addClass("attendingTable");

						attendTableDataEventTitle.text(data.attendingEvents[i].events_title);

						// append data / rows to table
						attendTableRow.append(attendTableDataEventDate);
						attendTableRow.append(attendTableDataEventTitle);
						attendTable.append(attendTableRow);

						// append table data to div
						attendingList.after(attendTable); // insert(append) after the h5 tag
					
					} // end for loop to add attending data
				}
				else {
					// if no attending event data then put empty data into table
					attendingList.after("<i>You are not attending any events yet<i><br><br>");

				} // end if statement for attending data list

				
				// need to add if statement for upcoming events check
				// need to add loop for adding to each image (if possible)
				// ---------------------------------------------------------------
				// Can I do this in a loop to build w/out duplicate coding??
				// ---------------------------------------------------------------
				// check if there is any data to be added to the images
				if (data.upcomingEvents.length > 0) {
					
					// loop through the 3 next events and add them to the images
					for(i = 0; i < data.upcomingEvents.length || i < 3; i++) {
						console.log("building upcoming event info now");
						console.log(data.upcomingEvents[i].event);

						// get elements to add upcoming event 1 data to image container
						var upcomingEventImg = $("#ravioli"+(i+1)); // grabs the img element
						var upcomingEventDiv = $("#upcoming" + (i+1) + " > div"); // grabs the upcoming1 div child
						// make the attr of the div relative to allow the label to be contained within it??
						upcomingEventDiv.css("position", "relative");

						// create the elements needed to add the upcoming event data to the img area
						var upcomingEventLink = $("<a></a>");
						var upcomingEventLabel = $("<h5></h5>");
						var rsvpBtn = $("<button>"); // should we add a button to each img for them to rsvp too??

						// grab date for label to use on image
						var event_date = data.upcomingEvents[i].event.events_start.split("T");

						// add data to the link / labels for the images
						upcomingEventLink.attr("href", "/singleEvent"); // was using the event id but this needs to be done on the single event page load // + data.upcomingEvents[0].event.id);
						upcomingEventLink.attr("alt", data.upcomingEvents[i].event.events_title);
						
						upcomingEventLabel.addClass("image_labels");
						upcomingEventLabel.addClass("orange lighten-3");
						upcomingEventLabel.html(data.upcomingEvents[i].event.events_title + "<br>" + event_date[0]);

						console.log(upcomingEventLabel);

						// add link / labels to the DOM
						upcomingEventLink.append(upcomingEventImg); // add image to a tag (href link)
						upcomingEventLink.append(upcomingEventLabel); // add label to link tag / image

						console.log(upcomingEventLink);
										
						// add image / link to the div
						upcomingEventDiv.append(upcomingEventLink);
					
					} // end for loop to add labels / data to upcoming event images 
				} // end if statement for upcoming events data check
				// ---------------------------------------------------------------
							
			});
			
			// var hosting = "data.events_title";
		
			// var id = "tokenID 1";
		
			// $.get("/api/dashboard/" + id, function(data) {

			// 	console.log(data);

			// 	var hosting = "data.events_title";

			// 	$("#host").empty();
			// });
		}
			
	});

    });
   


// this disables the modal....??/
$("#createEvent").on("click", function(event) {
    event.preventDefault();
});
    
//     var newEvent = { 
//         Title: $("#eventName").val().trim(),    
//         Month: $("#month").val().trim(),
//         Day: $("#day").val().trim(),
//         Host: $("#hostName").val().trim(),
//         Start: $("startTime").val().trim(),
//         End: $("endTime").val().trim(),
//         Street: $("street").val().trim(),
//         State: $("state").val().trim(),
//         Zip: $("zip").val().trim(),
         
//  }; 
 });

// $.post("/api/newevent", newEvent)
// 	.then(function(data) {
// 		console.log(data);

// 		alert("Adding new event...");
// 	});

// this disables the modal....??/	

// 	   $("#eventName").val("");
//     $("#month").val("");
//     $("#day").val("");
//     $("#hostName").val("");
//     $("#startTime").val("");
//     $("#endTime").val("");
//     $("#street").val("");
//     $("#state").val("");
//     $("#zip").val("");

// });


















