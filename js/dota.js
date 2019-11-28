let dotaHeroes = []
let filteredDotaHeroes = []

function fetchDotaHeroes() {
  axios({
    method: 'get',
    url: 'http://localhost:3000/dota'
  })
    .then(({ data }) => {
      dotaHeroes = data.heroes
      filteredDotaHeroes = dotaHeroes
      arrangeCards()
    })
    .catch(err => {
      console.log(err)
    })
}

function arrangeCards() {
  $('#hero-cards').empty()

  for (const hero of filteredDotaHeroes) {
    $('#hero-cards').append(`
      <div
        class="card mx-4 my-2 mx-sm-2"
        style="width: 12rem; height: 21rem;"
      >
        <img
          src="${hero.vertical}"
          class="card-img-top"
          alt="${hero.name}"
        />
        <div class="card-body text-center mt-0">
          <h5 class="card-title my-0">${hero.name}</h5>
          <a href="" class="nav-link d-inline-block" style="font-size: .8rem;"
            >Show Detail</a
          >
        </div>
      </div>
    `)
  }
}
