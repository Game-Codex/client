function showRegister() {
    $('#reg-link').on('click', function(event) {
        event.preventDefault()
        $('.home-page').hide()
        $('#login').hide()   
        $('#register').show()  
    })
}

function submitRegister() {
    console.log(serverUrl, '<<<<<<<<<<,,,')
    $('#register-form').on('submit', function(event) {
        event.preventDefault()
        $.ajax({
            method: 'POST',
            url: `${serverUrl}/register`,
            data: {
                email : $('#reg-email').val(),
                password : $('#reg-password').val()
            }            
        })
        .done( user => {
            console.log(user)
            $('#register').hide()  
            $('#login').show() 
        })
    })
}