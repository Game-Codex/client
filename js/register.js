// function showRegister() {
//     $('#reg-link').on('click', function(event) {
//         event.preventDefault()
//         $('.home-page').hide()
//         $('#login').hide()
//         $('#register').show()
//     })
// }

function submitRegister(e) {
  if (e) e.preventDefault()
  toast('Loading')
  $.ajax({
    method: 'POST',
    url: `${serverUrl}/register`,
    data: {
      username: $('#reg-username').val(),
      email: $('#reg-email').val(),
      password: $('#reg-password').val()
    }
  })
    .done(user => {
      Swal.close()
      console.log(user)
      $('#register').hide()
      $('#login').show()
    })
    .fail(err => console.log(err))
}
