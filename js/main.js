$(document).ready(function() {
  showLogin()
  // pokemonPopulate()
  // fetchDotaHeroes()
  // $('.navbar').hide()
  // $('#home-page').hide()
  // $('#register').hide()
  // $('#login').hide()
  // $('#pokemon').hide()
  // showRegister()
  // login()
  // submitRegister()
  // loginUser()
  $('#game-codex').click(function() {
    $('#yugioh-page').hide()
    $('#home-page').show()
    resumeVid()
  })
  //yugioh
  $('#go-yugioh').click(function() {
    $('#home-page').hide()
    $('#jumbotron-listcard').show()
    $('#yugioh-nav').show()
    $('#detail-card').hide()
    $('#yugioh-page').show()
    $('#btn-back-cardlist').hide()
    pauseVid()
    getCardWait()
    getCards('page1')
  })

  $('#page1').click(function() {
    getCards('page1')
  })

  $('#page2').click(function() {
    getCards('page2')
  })

  $('#page3').click(function() {
    getCards('page3')
  })

  $('#btn-back-cardlist').click(function() {
    $('#yugioh-nav').show()
    $('#btn-back-cardlist').hide()
    $('#detail-card').hide()
    $('#jumbotron-listcard').show()
  })
})

function showLogin(e) {
  if (e) e.preventDefault()
  $('.all-page').hide()
  $('#login').show()
}

function showRegister(e) {
  if (e) e.preventDefault()
  $('.all-page').hide()
  $('#register').show()
}
