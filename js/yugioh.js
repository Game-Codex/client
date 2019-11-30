var vidio = document.getElementById('vidio-bg')
const baseUrl = 'http://localhost:3000/yugioh'
function getCards(page) {
  $('#list-cards').empty()
  $('#list-cards-wait').empty()
  getCardWait()
  $('#list-cards-wait').show()
  toast('Loading')
  $.ajax({
    url: baseUrl + '/',
    method: 'GET',
    data: {
      pageNow: page
    },
    headers: { access_token: localStorage.getItem('access_token') }
  })
    .done(response => {
      Swal.close()
      $('#list-cards-wait').hide()
      // console.log(response);
      response.forEach(element => {
        var name = element.name.replace(/[^a-zA-Z0-9 ]/g, '')
        $('#list-cards').append(`
        <figure>
          <a onclick="detailCard('${name}')"><img
              src="${element.card_images[0].image_url_small}"
              alt="card"
          /></a>
        </figure>
        `)
      })
    })
    .fail(err => {
      console.log(err)
    })
    .always(() => {})
}

function getCardWait() {
  $('#btn-back-cardlist').hide()
  $('#yugioh-nav').show()
  $('list-cards-wait').empty()
  for (let i = 0; i < 12; i++) {
    $('#list-cards-wait').append(`
    <figure>
    <a ><img
    src="./img/backsidecard.jpg" widht="168" height="246"
    alt="card"
    /></a>
    </figure>
    `)
    // $("#list-cards-wait").show();
  }
}

function detailCard(name) {
  $('#jumbotron-listcard').hide()
  $('#yugioh-nav').hide()
  $('#detail-card').show()
  $('#detail-card').empty()
  $.ajax({
    url: baseUrl + `/detail?name=${name}`,
    method: 'GET',
    headers: { access_token: localStorage.getItem('access_token') }
  })
    .done(response => {
      $('#btn-back-cardlist').show()
      $('#detail-card').append(`
      <div id="detailcard-img">
        <img
          src="${response[0].card_images[0].image_url}"
          width="267"
          height="390"
          alt="detail"
        />
      </div>
      <div id="detailcard-info">
        <div id="card-name">
          <h1>${response[0].name}</h1>
        </div>
        <div id="card-id">
          <span>
            <img
              src="./img/card-id.jpg"
              width="25px"
              height="30"
              alt="card-id"
            />
          </span>
          <span>
            ${response[0].type}/
          </span>
          <span>
            ${response[0].id}
          </span>
        </div>
        <div id="card-type">
          <span>
            <img
              src="./img/race.png"
              width="25px"
              height="30"
              alt="card-id"
            />
          </span>
          <span>
            ${response[0].race}
          </span>
        </div>
        <div id="card-archetype">
          <span>
            <img
              src="./img/archetype.png"
              width="25px"
              height="30"
              alt="card-id"
            />
          </span>
          <span>
            ${response[0].archetype}
          </span>
        </div>
        <div id="card-desc">
          <span>
            ${response[0].desc}
          </span>
        </div>
      </div>
      `)
    })
    .fail(err => {
      console.log(err)
    })
    .always()
}

function pauseVid() {
  vidio.pause()
}

function resumeVid() {
  vidio.play()
}
