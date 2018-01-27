// get the id to be able to add it to the dashboard/get function below
// document 
$(document).ready(function(){
  $('.modal-trigger').leanModal();
});

// For each event need to have a event id -- div or data toggle GET 

// modal button will have POST

// 

//when user clicks createEvent btn
$("#createEvent").on("click", function(event) {
	event.preventDefault();

	//make a newEvent obj
	var newEvent = {
		// Title from eventName input
		Title: $("#eventName").val().trim(),
		// Date from eventDate input
		Month: $("#eventDate").val().trim(),


	}
}); 

$.get("/api/dashboard/" + id, function(data){

  console.log(data);

  var name = data.user_name.split(" "),
      firstName = fullName[0];

  var userID = data.id;

  $("#plate").empty();

  if(!data) {
    $("#plate").append("<p> Your Plate </p>");
    $("#hostingDash").append("<p> Sorry for our mess")
  }
  else {
    $("#plate").append("<p>" + firstName + "'s Plate</p>");
  } 


});



