// Code here handles what happens when a user submits a new rsvp on the form.
// Effectively it takes the form inputs then sends it to the server to save in the DB.

$(document).ready(function() {
    $('.modal-trigger').leanModal();


    var path = window.location.pathname;
    var eventId = path.slice(path.lastIndexOf("/") + 1);

    console.log(eventId);


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

    console.log('request outgoing')

    $.get("/api/event/" + eventId, function(data) {

        console.log(data);

        var eventName = data.eventDetails.events_title;
        $('#eventName').text(eventName);

        var month = data.eventDetails.events_start;
        $("#month").text(month);

        var day = data.eventDetails.events_start;
        $("#day").text(day);

        var host = data.eventDetails.user_Id;
        $("#host").text(host);

        var startTime = data.eventDetails.events_start;
        $("#startTime").text(startTime);

        var endTime = data.eventDetails.events_start;
        $("#endTime").text(endTime);

        var location = data.eventDetails.events_loc_street_add + data.eventDetails.events_loc_city +  data.eventDetails.events_loc_state + data.eventDetails.events_loc_zip;
        $("#location").text(location);




        // for each attendee that our server sends us back
        for (var i = 0; i < data.length; i++) {

                // WHERE TABLE GOES. FOLLOW JACK's EXAMPLE
            var attendees = data.attendees;
            for (var i = 0; i < attendees.length; i++) {
            var tableRow = $('<tr><td>' + attendees[i].name + '</td><td>' + attendees[i].country + '</tr>')
            $('#rsvpList').append(tableRow)
            };
            

            



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


        }
    });







});