var token;
var name;
var email;


jQuery.each( [ "put" ], function( i, method ) {
  jQuery[ method ] = function( url, data, callback, type ) {
    if ( jQuery.isFunction( data ) ) {
      type = type || callback;
      callback = data;
      data = undefined;
    }

    return jQuery.ajax({
      url: url,
      type: method,
      dataType: type,
      data: data,
      success: callback
    });
  };
});

var GoogleAuth;
var SCOPE = 'https://www.googleapis.com/auth/userinfo.profile';
function handleClientLoad() {
  // Load the API's client and auth2 modules.
  // Call the initClient function after the modules load.
  gapi.load('client:auth2', initClient);
}

function initClient() {
  // Retrieve the discovery document for version 3 of Google Drive API.
  // In practice, your app can retrieve one or more discovery documents.
  var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

  // Initialize the gapi.client object, which app uses to make API requests.
  // Get API key and client ID from API Console.
  // 'scope' field specifies space-delimited list of access scopes.
  gapi.client.init({
      'apiKey': 'AIzaSyCXxrv98Cw050fw84X7ozRuZYzYeDOP-Qc',
      'discoveryDocs': [discoveryUrl],
      'clientId': '508293590442-jekrcrdf9b5na32ubhoobv1kgqntcg22.apps.googleusercontent.com',
      'scope': SCOPE
  }).then(function () {
    GoogleAuth = gapi.auth2.getAuthInstance();

    // Listen for sign-in state changes.
    GoogleAuth.isSignedIn.listen(updateSigninStatus);

    // Handle initial sign-in state. (Determine if user is already signed in.)
    var user = GoogleAuth.currentUser.get();
    setSigninStatus();

    // Call handleAuthClick function when user clicks on
    //      "Sign In/Authorize" button.
    $('#googlebtn').click(function() {
      handleAuthClick();
    });     
  });
}

function handleAuthClick() {
  if (GoogleAuth.isSignedIn.get()) {
    // User is authorized and has clicked 'Sign out' button.
    GoogleAuth.signOut();
  } else {
    // User is not signed in. Start Google auth flow.
    GoogleAuth.signIn();
  }
}

function setSigninStatus(isSignedIn) {

  console.log("do I get here?");
var user = GoogleAuth.currentUser.get();
var isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {
      $('#googlebtn').html('Sign out');
      name = user.getBasicProfile().getName();
      email = user.getBasicProfile().getEmail();
      token = user.Zi.id_token
      $.put("/api/login/" + email + "/" + token + "/" + name, function(data) {
        console.log(data);
        
      });
      window.location = "/dashboard";
    } else {
      $('#googlebtn').html('Sign In with Google!');
    }
    // Clear absolutely everything stored in localStorage using localStorage.clear()
    localStorage.clear();
  
    // Store the username into localStorage using "localStorage.setItem"
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  }

function updateSigninStatus(isSignedIn) {
  setSigninStatus();
}
