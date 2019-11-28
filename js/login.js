const serverUrl = 'http://localhost:3000';

function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    let profile = googleUser.getBasicProfile();
    
    $.ajax({
        type: "post",
        url: `${serverUrl}/loginGoogle`,
        data: {id_token, email: profile.getEmail()}
    })
    .done(jwt => {localStorage.setItem('access_token', jwt)})
    .fail(error => console.log(error))
    
    // $('.g-signin2').hide()
    // $('#googleSignOut').show()
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
 
    console.log('logged out')
    localStorage.removeItem('access_token')
    
    // $('.g-signin2').show()
    // $('#googleSignOut').hide()
  }