let dotaHeroes = []
let filteredDotaHeroes = []

function fetchDotaHeroes() {
  toast('Loading')
  axios({
    method: 'get',
    url: 'http://localhost:3000/dota'
  })
    .then(({ data }) => {
      dotaHeroes = data.heroes
      filteredDotaHeroes = dotaHeroes
      arrangeCards()
      Swal.close()
    })
    .catch(err => {
      console.log(err)
    })
}

function arrangeCards() {
  $('#dota-hero-detail').hide()
  $('#dota-hero-cards').show()
  $('#dota-hero-cards').empty()
  for (const hero of filteredDotaHeroes) {
    $('#dota-hero-cards').append(`
      <div
        class="card mx-4 my-2 mx-sm-2 dota-card"
        style="width: 12rem; height: 21rem;"
      >
        <img
          src="${hero.vertical}"
          class="card-img-top"
          alt="${hero.name}"
        />
        <div class="card-body text-center mt-0">
          <h5 class="card-title my-0">${hero.name}</h5>
          <a 
            href=""
            class="nav-link d-inline-block"
            style="font-size: .8rem;"
            onclick="showDotaCardDetail(event, ${hero.id}, '${hero.name}', '${hero.vertical}')"
            >Show Detail</a
          >
        </div>
      </div>
    `)
  }
}

function filterHeroByRole(role) {
  event.preventDefault()
  toast('Loading')
  if (role == 'all') {
    $('#nav-hero-roles .nav-link').removeClass('active')
    $(`#nav-hero-roles #${role}`).addClass('active')
    filteredDotaHeroes = dotaHeroes
    arrangeCards()
  } else {
    axios({
      method: 'get',
      url: `http://localhost:3000/dota/roles/${role}`
    })
      .then(({ data }) => {
        $('#nav-hero-roles .nav-link').removeClass('active')
        $(`#nav-hero-roles #${role}`).addClass('active')
        const heroesId = data.hero
        filteredDotaHeroes = dotaHeroes.filter(hero => {
          return heroesId.includes(hero.id)
        })
        arrangeCards()
        Swal.close()
      })
      .catch(err => console.log(err))
  }
}

function showDotaCardDetail(e, id, name, imgurl) {
  if (e) e.preventDefault()
  toast('Loading')
  $('.dota-card').hide()
  $('#dota-hero-detail').show()
  axios({
    method: 'get',
    url: `http://localhost:3000/dota/${id}`
  })
    .then(({ data }) => {
      const hero = data.hero
      hero.primary_attr =
        hero.primary_attr == 'str'
          ? 'Strength'
          : hero.primary_attr == 'int'
          ? 'Intelligent'
          : hero.primary_attr == 'agi'
          ? 'Agility'
          : hero.primary_attr
      $('#dota-hero-detail').empty().append(`
        <div class="card mr-5 mt-3 border" style="height: 23rem;">
          <img
            src="${imgurl}"
            class="card-img-top"
            alt="${name}"
          />
          <div class="card-body text-center mt-0">
            <h5 class="card-title my-0 font-weight-bolder">${name}</h5>
          </div>
        </div>

        <table class="table table-borderless w-50">
          <tbody>
            <tr>
              <td>Roles</td>
              <td>${hero.roles.join(', ')}</td>
            </tr>
            <tr>
              <td>Main Attributes</td>
              <td>${hero.primary_attr}</td>
            </tr>
            <tr>
              <td>Base Health</td>
              <td>${hero.base_health} HP</td>
            </tr>
            <tr>
              <td>Base Mana</td>
              <td>${hero.base_mana} MP</td>
            </tr>
            <tr>
              <td>Base STR</td>
              <td>${hero.base_str}</td>
            </tr>
            <tr>
              <td>Base INT</td>
              <td>${hero.base_int}</td>
            </tr>
            <tr>
              <td>Base AGI</td>
              <td>${hero.base_agi}</td>
            </tr>
            <tr>
              <td>STR Gain</td>
              <td>${hero.str_gain}</td>
            </tr>
            <tr>
              <td>INT Gain</td>
              <td>${hero.int_gain}</td>
            </tr>
            <tr>
              <td>AGI Gain</td>
              <td>${hero.agi_gain}</td>
            </tr>
            <tr>
              <td>Attack Range</td>
              <td>${hero.attack_range}</td>
            </tr>
            <tr>
              <td>Move Speed</td>
              <td>${hero.move_speed}</td>
            </tr>
          </tbody>
        </table>
      `)
      Swal.close()
    })
    .catch(err => {
      console.log(err)
    })
}

function searchHeroByName() {
  filteredDotaHeroes = dotaHeroes.filter(hero => {
    const pattern = $('#dota-hero-search')
      .val()
      .split('')
      .map(char => {
        return `(?=.*${char})`
      })
      .join('')
    const regex = new RegExp(pattern, 'gi')
    return regex.test(hero.name)
  })
  arrangeCards()
}
