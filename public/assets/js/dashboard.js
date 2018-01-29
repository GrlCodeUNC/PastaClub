// get the id to be able to add it to the dashboard/get function below
// document 

$(document).ready(function(){
  $('.modal-trigger').leanModal();
});

// $(document).ready(function(){
//              if (jQuery) {  
//                // jQuery is loaded  
//                alert("Yeah!");
//              } else {
//                // jQuery is not loaded
//                alert("Doesn't Work");
//              }
//           });
// $(document).ready(function(){
//   $('.modal-trigger').leanModal();
// });

// $(document).ready(function(){
//              if (jQuery) {  
//                // jQuery is loaded  
//                alert("Yeah!");
//              } else {
//                // jQuery is not loaded
//                alert("Doesn't Work");
//              }
//           });


$(document).ready(function(){

      $('.modal-trigger').leanModal();

 //      $.get("/api/dashboard/" + userID, function(data){

 //  	  	console.log(data);

	//   	var name = data.user_name.split(" "),
	//       	firstName = fullName[0];

 //  	  	var userID = data.id;

 //  	  $("#plate").empty();

	//   if(!data) {
	//     $("#plate").append("<p> Your Plate </p>");
	//     $("#hostingDash").append("<p> Sorry for our mess")
	//   }
 //  	  else {
 //    	$("#plate").append("<p>" + firstName + "'s Plate</p>");
 //  	  } 
	// });



  var hosting = data.events_title;

	var id = "tokenID 1";


    	$.get("/api/dashboard/" + id, function(data){

      		console.log(data);

      		var hosting = data.events_title;

      			$("#host").empty();

	});
});

// For each event need to have a event id -- div or data toggle GET 

// modal button will have POST

// 

//when user clicks createEvent btn

// $("#createEvent").on("click", function(event) {
//     event.preventDefault();

    //make a newEvent obj
    // var newEvent = {
        // Title from eventName input
        // Title: $("#eventName").val().trim(),
        // Month from month input
        // Month: $("#month").val().trim(),
        // Day from day input
        // Day: $("#day").val().trim(),
        // Host from host input
        // Host: $("#hostName").val().trim(),
        // Start from startTime input
        // Start: $("startTime").val().trim(),
        // End from endTime input
        // End: $("endTime").val().trim(),
        // Location from location input
        // Location: $("location").val().trim(),
    
// }; 


// send an AJAX POST-request with jQuery
  // $.post("/api/newEvent", newEvent)
    // on success, run this callback
    // .then(function(data) {
      // log the data we found
      // console.log(data);
      // tell the user we're adding a character with an alert window
    //   alert("Adding new event...");
    // });



//       $("#eventName").val("");
//         $("#month").val("");
//         $("#day").val("");
//         $("#hostName").val("");
//         $("#startTime").val("");
//         $("#endTime").val("");


// });
