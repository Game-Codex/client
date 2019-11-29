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

function loginUser() {
    $('#login-form').on('submit', function(event) {
        event.preventDefault()
        $.ajax({
            method: 'POST',
            url: `${serverUrl}/login`,
            data: {
                email : $('#login-email').val(),
                password : $('#login-password').val()
            }            
        })
        .done( user => {
            localStorage.setItem('access_token', user.access_token)
            $('#register').hide()  
            $('#login').hide()
            $('#home-page').show() 
        })
    })
}