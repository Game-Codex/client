function login() {
  $('#login-link').on('click', function(event) {
    event.preventDefault()
    $('.home-page').hide()
    $('#register').hide()
    $('#login').show()
  })
}

function showLogin() {
  $('#reg-btn').on('click', function(event) {
    event.preventDefault()
    $('.home-page').hide()
    $('#register').hide()
    $('#login').show()
  })
}

function loginUser(e) {
  if (e) e.preventDefault()
  toast('Loading')
  $.ajax({
    method: 'POST',
    url: `${serverUrl}/login`,
    data: {
      email: $('#login-email').val(),
      password: $('#login-password').val()
    }
  })
    .done(user => {
      Swal.close()
      localStorage.setItem('access_token', user.access_token)
      showHomePage()
    })
    .fail(err => console.log(err))
}
