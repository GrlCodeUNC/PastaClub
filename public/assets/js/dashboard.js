// get the id to be able to add it to the dashboard/get function below
// document 

$.get("/api/dashboard/" + id, function(data){

  console.log(data);

  var fullName = data.user_name.split(" "),
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


