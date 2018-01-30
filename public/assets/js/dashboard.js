
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

				// dynamically add data to the divs from the .get data
				// check to see if there is any events the user is hosting
				if (data.hostingEvents.length > 0) {

					// clearing out the div
					// can't clear div because button is in there already
					// $("#hostingDash").empty();
					console.log("building hosting events now");
					var hostingList = $("#hostingDash h5:first"); // grabs the first h5 element in the hostingDash div

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
						hostTableRow.css("id", data.hostingEvents[i].id); // add id for onclick code

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
						// $("#hostingDash").append(hostTable);
						hostingList.after(hostTable); // append after the h5 tag??
					
					}
				}

			
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
//  $("#createEvent").on("click", function(event) {
//     event.preventDefault();

    
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
         
// }; 

$.post("/api/newEvent", newEvent)
	.then(function(data) {
		console.log(data);

		alert("Adding new event...");
	});

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















