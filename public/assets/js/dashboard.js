$(document).ready(function(){
      $('.parallax').parallax();
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