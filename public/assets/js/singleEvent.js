// Code here handles what happens when a user submits a new rsvp on the form.
// Effectively it takes the form inputs then sends it to the server to save in the DB.

$(document).ready(function() {
    $('.modal-trigger').leanModal();

    // when user clicks rsvp btn
    $("#rsvp").on("click", function(event) {
        event.preventDefault();

        //make a rsvp obj
        var newRsvp = {
            // item from items they're bringing input
            item: $("#bringing").val().trim(),
            // comment from comments input
            comment: $("#comments").val().trim(),

            userId: 1,

            eventId: 5,

        };

        // send an AJAX POST-request with jQuery
    $.post("/api/RSVP", newRsvp)
            // on success, run this callback
            .then(function(data) {
                // log the data we found
                console.log(data);
                // tell the user we're adding a new rsvp with an alert window
                alert("Adding new rsvp...");
            });

        // empty each input by replacing the value with an empty string
        $("#rsvp").val("");
        $("#bringing").val("");
        $("#comments").val("");
    });

    // make a get request to our api to grab every attendee that rsvp'd
    $.get("/api/RSVP", function(data) {

        // for each attendee that our server sends us back
        for (var i = 0; i < data.length; i++) {

            console.log(data);

            // // append the table to the meetup section
            // $(".table").append(Meetup);

            // Now add all of our attendee data to the div already on the page
            
            // make the attendee and td
            $("#attendee1" + i).append("<td> " + data[i].userId + "</td>");
            // the item and td
            $("#item1" + i).append("<td> " + data[i].item + "</td>");
            // the comment and td
            $("#comment1" + i).append("<td> " + data[i].comment + "</td>");

            // how to add <tr> in there for table?

        }
    });


});