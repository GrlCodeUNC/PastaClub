
 $(document).ready(function(){

   $('.modal-trigger').leanModal();

   // added to get user email for this page
//   var email = googleUser.getBasicProfile().getEmail();
var name = localStorage.getItem("name");
var email = localStorage.getItem("email");
  console.log("email = " + email);
  console.log("name = " + name);

//    var id = "tokenID 1";

   $.get("api/dashboard/" + id, function(data) {

   	 console.log(data);

   var name = date.user_name.split(" "),
   		firstName = fullName[0];

   		var userID = data.id;

   	$("#plate").empty();

   	if(!data) {
   		$("#plate").append("<p> Your Plate </p>");
   		$("#hostingDash").append("<p> Sorry for our mess")
   	}
   		else{
   			$("#plate").append("<p>" + firstName + "'s Plate</p>");
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















