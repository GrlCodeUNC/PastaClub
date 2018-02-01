// Code here handles what happens when a user submits a new rsvp on the form.
// Effectively it takes the form inputs then sends it to the server to save in the DB.

$(document).ready(function() {
    $('.modal-trigger').leanModal();


    var path = window.location.pathname;
    var eventId = path.slice(path.lastIndexOf("/") + 1);
    var userId = localStorage.getItem("userid");
    var pictureID = localStorage.getItem("picture");

    console.log("user ID = " + userId);
    console.log("event ID = ", eventId);
    console.log("picture = " + pictureID);

    // Appending profile picture for every user to the page
    var image = $("<img>");
      image.addClass("circle").attr("width", "80").attr("src", pictureID);
      $("#userPic").append(image);

    // when user clicks rsvp btn
    $("#rsvpButton").on("click", function(event) {
        event.preventDefault();

        //make a rsvp obj
        var newRsvp = {
            // item from items they're bringing input
            item: $("#bringing").val().trim(),
            // comment from comments input
            comment: $("#comments").val().trim(),
            // userId from local storage (welcome / sign in page)
            userId: userId,
            // eventId from url / path sent via dashboard page
            eventId: eventId,
        };

        console.log("data sent to server", newRsvp);

        // send an AJAX POST-request with jQuery
        $.post("/api/RSVP", newRsvp)
            // on success, run this callback
        .then(function(data) {
            // log the data we found
            console.log(data);
            // tell the user we're adding a new rsvp with an alert window
            // alert("Adding new rsvp...");
            var commentArray = [];
            commentArray.push(data);
            buildAttendeeTable(commentArray);
        });

        // empty each input by replacing the value with an empty string
        $("#rsvp").val("");
        $("#bringing").val("");
        $("#comments").val("");
    });

    console.log('request outgoing')

    $.get("/api/event/" + eventId, function(data) {

        console.log(data);

        if (data.eventDetails.id) {

            var eventName = data.eventDetails.events_title;
            $('#eventName').text(eventName);

            // grab start date and format for display
            var startDate = new Date(data.eventDetails.events_start);  
            var options = {  
                weekday: "long", year: "numeric", month: "short",  
                day: "numeric", hour: "2-digit", minute: "2-digit"  
            };
            var longStartDate = startDate.toLocaleTimeString("en-us", options);
            // take out start time to display separately in webpage
            var displayStart = longStartDate.slice(longStartDate.lastIndexOf(",") + 1);
            $("#startTime").text(displayStart); // display formatted time view

            // grab end date and format for dislpay if not null
            var endTime = data.eventDetails.events_end;
            // endTime = null; // test null case
            if (endTime !== null) {

                var endDate = new Date(endTime);  
                var longEndDate = endDate.toLocaleTimeString("en-us", options);
                // take out start time to display separately in webpage
                var displayEnd = longEndDate.slice(longEndDate.lastIndexOf(",") + 1);
                $("#endTime").text(" to " + displayEnd);
            }
            else {

                $("#endTime").text(" until ... ");
            }

            // console.log(displayStart);
            var dateOnlyOptions = {  
                weekday: "long", year: "numeric", month: "short",  
                day: "numeric"  
            };

            // new view of the single event page with full date and start time / end time showing differently
            var longStartDate = startDate.toLocaleDateString("en-us", dateOnlyOptions);
            $("#date").text(longStartDate);
            console.log(longStartDate);

            // var month = data.eventDetails.events_start;
            // $("#month").text(month);

            // var day = data.eventDetails.events_start;
            // $("#day").text(day);

            var host = data.eventDetails.user.user_name;
            $("#host").text(host);

            // format location data from server into better display view
            var location = data.eventDetails.events_loc_street_add + "<br>" + data.eventDetails.events_loc_city + ", " + data.eventDetails.events_loc_state + " " + data.eventDetails.events_loc_zip;
            $("#location").html(location);

            // check to see if there are any comments / attendees for this event
            if (data.commentInfo[0].code === -1) {

                var tableRow = $('<tr><td> No Attendees Yet </td><td>');
                $('#rsvpList').prepend(tableRow);

            }
            else {
                // could use this on both areas to condense and add newest to the view
                buildAttendeeTable(data.commentInfo);
            } // end if statement to check for comments back from server
        
        } // end if check for datat from server
        else {

            // make user go back to dashboard??

        } // end else statement to check for data back from server

    }); // end .get for comment / attendee section


}); // on document ready function


function buildAttendeeTable (dbInfo) {

    // for each attendee that our server sends us back
    for (var i = 0; i < dbInfo.length; i++) {

        var tableRow = $('<tr><td>' + dbInfo[i].user.user_name + '</td><td>' + dbInfo[i].event_item + '</td><td>' + dbInfo[i].comment_body + '</td></tr>');
        $('#rsvpList').prepend(tableRow);
        
    };
    
};