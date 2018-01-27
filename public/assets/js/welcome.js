$(document).ready(function(){
    $('.modal-trigger').leanModal();
  });

var CLIENT_ID = "508293590442-rrplmivvjjoj3kbs3gj2u7se2ampcm3j.apps.googleusercontent.com";
var API_KEY = "AIzaSyAammCuBWBn776LjE3FIdPiLh5_bLQmc7o";



function onSuccess(googleUser) {
  console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
}
function onFailure(error) {
  console.log(error);
}
function renderButton() {
  gapi.signin2.render('my-signin2', {
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure
  });
};



// var authorizeButton = document.getElementById("signin-button");
// var signoutButton = document.getElementById('signUpbtns');

/**
 *  On load, called to load the auth2 library and API client library.
 */
// function handleClientLoad() {
//   gapi.load('client:auth2', initClient);
// }

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
// function initClient() {
//   gapi.client.init({
//     apiKey: API_KEY,
//     clientId: CLIENT_ID,
//   }).then(function () {
//     // Listen for sign-in state changes.
//     gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

//    Handle the initial sign-in state.
//     updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
//     authorizeButton.onclick = handleAuthClick;
//     signoutButton.onclick = handleSignoutClick;
//   });
// }

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
// function updateSigninStatus(isSignedIn) {
//   if (isSignedIn) {
//     authorizeButton.style.display = 'none';
//     signoutButton.style.display = 'block';
//   } else {
//     authorizeButton.style.display = 'block';
//     signoutButton.style.display = 'none';
//   }
// }

/**
 *  Sign in the user upon button click.
 */
// function handleAuthClick(event) {
//   gapi.auth2.getAuthInstance().signIn();
// }

/**
 *  Sign out the user upon button click.
 */
// function handleSignoutClick(event) {
//   gapi.auth2.getAuthInstance().signOut();
// }
