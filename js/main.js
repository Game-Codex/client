$(document).ready(function() {
  if (localStorage.getItem('access_token')) showHomePage()
  else showLogin()
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
  $('#btn-signout').hide()
  $('.all-page').hide()
  $('#login').show()
}

function showRegister(e) {
  if (e) e.preventDefault()
  $('#btn-signout').hide()
  $('.all-page').hide()
  $('#register').show()
}

function showHomePage(e) {
  if (e) e.preventDefault()
  $('#btn-signout').show()
  $('.all-page').hide()
  $('#home-page').show()
}

function showDotaPage(e) {
  if (e) e.preventDefault()
  $('.all-page').hide()
  $('#dota-page').show()
  fetchDotaHeroes()
}
