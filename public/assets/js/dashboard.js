$.get("/login", function(data){
  console.log(data);
  $("#").empty();

  if(!data) {
    $("#").append("<p> Your Plate </p>");
  }
  else {
    $("#").append("<p>" + data.name + "</p>");
  } 
});