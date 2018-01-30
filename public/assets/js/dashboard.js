
 $(document).ready(function(){

   $('.modal-trigger').leanModal();

   // added to get user email for this page
//   var email = googleUser.getBasicProfile().getEmail();
// added local storage items to grab info from welcome page
var nameLS = localStorage.getItem("name");
var email = localStorage.getItem("email");
  console.log("email = " + email);
  console.log("name = " + nameLS);

   var id = "tokenID 1";



   $.get("/api/dashboard/" + id, function(data) {

	console.log("this is the dashboard.js on client");
   	 console.log(data);

   var fullName = data.userName.split(" ");
   		var firstName = fullName[0];

   		var userID = data.id;

   	$("#plate").empty();

   	if(!data) {
   		$("#plate").append("<p> Your Plate </p>");
   		$("#hostingDash").append("<p> Sorry for our mess")
   	}
   		else{
			   $("#plate").append("<p>" + firstName + "'s Plate</p>");
			//    $("#plate").append("<p>" + firstName + "'s Plate</p>");
   		}
   });

   var hosting = "data.events_title";

   var id = "tokenID 1";

   		$.get("/api/dashboard/" + id, function(data) {

   			console.log(data);

   			var hosting = "data.events_title";

   			$("#host").empty();
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















