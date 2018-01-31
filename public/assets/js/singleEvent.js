// Code here handles what happens when a user submits a new rsvp on the form.
// Effectively it takes the form inputs then sends it to the server to save in the DB.

$(document).ready(function() {
    $('.modal-trigger').leanModal();


    var path = window.location.pathname;
    var eventId = path.slice(path.lastIndexOf("/") + 1);
    var userId = localStorage.getItem("userid");

    console.log("user ID = " + userId);
    console.log("event ID = ", eventId);

    // when user clicks rsvp btn
    $("#rsvp").on("click", function(event) {
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

    console.log('request outgoing')

    $.get("/api/event/" + eventId, function(data) {

        console.log(data);

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

            $("#endTime").text("until ... ");
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

        // var startTime = data.eventDetails.events_start;
        // $("#startTime").text(startTime);
        // $("#startTime").text(displayStart); // display formatted time view

        // var endTime = data.eventDetails.events_start;
        // $("#endTime").text(endTime);

        // format location data from server into better display view
        var location = data.eventDetails.events_loc_street_add + "<br>" + data.eventDetails.events_loc_city + ", " + data.eventDetails.events_loc_state + " " + data.eventDetails.events_loc_zip;
        $("#location").html(location);


        // for each attendee that our server sends us back
        for (var i = 0; i < data.commentInfo.length; i++) {

            var tableRow = $('<tr><td>' + data.commentInfo[i].user.user_name + '</td><td>' + data.commentInfo[i].event_item + '</td><td>' + data.commentInfo[i].comment_body + '</td></tr>');
            $('#rsvpList').append(tableRow);
            
                // WHERE TABLE GOES. FOLLOW JACK's EXAMPLE
            // var attendees = data.attendees;
            // for (var i = 0; i < attendees.length; i++) {
            // var tableRow = $('<tr><td>' + attendees[i].name + '</td><td>' + attendees[i].country + '</tr>')
            // $('#rsvpList').append(tableRow)
            // };
            

            



            // // append the table to the meetup section
            // $(".table").append(Meetup);

            // Now add all of our attendee data to the div already on the page

            // make the attendee and td
            // $("#attendee1" + i).append("<td> " + data[i].userId + "</td>");
            // // the item and td
            // $("#item1" + i).append("<td> " + data[i].item + "</td>");
            // // the comment and td
            // $("#comment1" + i).append("<td> " + data[i].comment + "</td>");

            // how to add <tr> in there for table?


            // loop through data for hosting table side if available


            // here is what we are getting back from db for hosting events


            // create a row for the data
            // var attendeeTableRow = $("<tr></tr>");
            // attendeeTableRow.addClass("event_data"); // add class for onclick code
            // attendeeTableRow.attr("id", data.id); // add id for onclick code

            // // create data elements for data
            // // date info
            // var hostTableDataEventDate = $("<td></td>");
            // var hostTableDataEventDateLink = $("<a>");
            // // get date info out of db format
            // var event_start_info = data.hostingEvents[i].events_start.split("T");

            // hostTableDataEventDate.text(event_start_info[0]);

            // // title info
            // var hostTableDataEventTitle = $("<td></td>");
            // hostTableDataEventTitle.text(data.hostingEvents[i].events_title);

            // // append data / rows to table
            // hostTableRow.append(hostTableDataEventDate);
            // hostTableRow.append(hostTableDataEventTitle);
            // hostTable.append(hostTableRow);

            // // append table data to div
            // hostingList.after(hostTable); // insert(append) after the h5 tag


        } // end for loop for comment table info

    }); // end .get for comment / attendee section


}); // on document ready function