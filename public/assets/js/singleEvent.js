$(document).ready(function(){
    $('.modal-trigger').leanModal();

});

// when user clicks rsvp btn
$("#rsvp").on("click", function(event) {
    event.preventDefault();

    //make a rsvp obj
    var newRsvp = {
        // Title from eventName input
        Items: $("#bringing").val().trim(),
        // Month from month input
        Comments: $("#comments").val().trim(),
    };
    
    $.post("/api/newRsvp", newRsvp)
    // on success, run this callback
    .then(function(data) {
      // log the data we found
      console.log(data);
      // tell the user we're adding a character with an alert window
      alert("Adding new rsvp...");
    });

      $("#rsvp").val("");
        $("#bringing").val("");
        $("#comments").val("");
});


// send an AJAX POST-request with jQuery
