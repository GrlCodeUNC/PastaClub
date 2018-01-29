$(document).ready(function(){
    $('.modal-trigger').leanModal();
  });



  var CLIENT_ID = "508293590442-q7ltok2rfnli378h2co0398hbnef5gli.apps.googleusercontent.com";
  var API_KEY = "AIzaSyAheZEDMMZC5FHJv0aa99rEyH2qyUV5FVc";
  var token;
  var email;
  var name;
  var whatever = 1;

    function onSuccess(googleUser) {
      token = googleUser.Zi.id_token;
      email = googleUser.getBasicProfile().getEmail();
      name = googleUser.getBasicProfile().getName();
      // console.log(email);
      // console.log(token);
    }
    function onFailure(error) {
      console.log(error);
    }
    function renderButton() {
      gapi.signin2.render('my-signin2', {
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        'scope': 'profile',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure,
        redirect_uri: "http://localhost:8080/dashboard",
      });
    }

// $("my-signin2").on("click", function() {
//   console.log(whatever);
// });




  function google() {
    $.put("/api/login/" + email + "/", function(data) {
      console.log(data);
    });
  };
  // onSuccess();
  // var id_token = googleUser.Zi.id_token;
  // var email = googleUser.getBasicProfile().getEmail();
  // var name = googleUser.getBasicProfile().getName();
  // console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    // console.log(googleUser);
    // console.log(id_token);
    // console.log(googleUser.Zi.id_token);
    // console.log(name);
    // console.log(email);
    // $.put("/api/login/" + email + "/" + id_token, function(data) {
    //   console.log(data)
    // })
  // function onFailure(error) {
  //   console.log(error);
  // }
  // function renderButton() {
  //   gapi.signin2.render('my-signin2', {
  //     apiKey: API_KEY,
  //     clientId: CLIENT_ID,
  //     'scope': 'profile',
  //     'width': 240,
  //     'height': 50,
  //     'longtitle': true,
  //     'theme': 'dark',
  //     'onsuccess': onSuccess,
  //     'onfailure': onFailure,
  //     redirect_uri: "http://localhost:8080/dashboard"
  //   });
  // };
  // var id_token = googleUser.Zi.id_token;
  // var email = googleUser.getBasicProfile().getEmail();
  // var name = googleUser.getBasicProfile().getName();
//   $.put("/api/login/" + email + "/" + id_token, function(data) {
//     console.log(data)
// });
// };
// }
// grab the data from google and send to api_routes to check if already member or not,
    // if they are then take that data and send it to the dashboard
    // if not give them a button to add themselves to the database


// var authorizeButton = document.getElementById("signin-button");
// var signoutButton = document.getElementById('signUpbtns');


