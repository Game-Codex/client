
const numOfTypes = 3

function fillPokemonTypes() {
   
   return new Promise((resolve, reject) => {

      const types = []

      $.ajax({
   
         method: 'get',
         url: `http://localhost:3000/pokemon/getTypes/${numOfTypes}`
      })
      .done(pokemonTypes => {
   
         for(let i in pokemonTypes) types.push(pokemonTypes[i])
         
         // set the tabs
         $('#pokemon-tab-name1').text(pokemonTypes[0])
         $('#pokemon-tab-name2').text(pokemonTypes[1])
         $('#pokemon-tab-name3').text(pokemonTypes[2])

         resolve(types)
      })
      .fail(error => reject(error))
   })
}

function fillCurrentCards() {

   return new Promise((resolve, reject) => {

      $.ajax({
   
         method: 'get',
         url: `http://localhost:3000/pokemon/getByTypes/all`
      })
      .done(cards => {

         fillTable(cards)
         resolve(cards)

      })
      .fail(error => reject(error))
   })
}

function fillTable(cards) {

   $('#pokemon-card-list').empty()

   cards.forEach((card) => {
      console.log(typeof card.id)
      
      $('#pokemon-card-list').append(`

         <div class="individual-card">

            <a href="#" onclick="showDetail('${card.id}')">
               <img src="${card.imageUrl}" alt="${card.name}" class="individual-card-image border" />
            </a>
            <span class="individual-card-name">${card.name}</span>

         </div>
      `)
   })
}

function showDetail(id) {
   event.preventDefault()
   $.ajax({

      url: `http://localhost:3000/pokemon/getDetail/${id}`,
      method: `get`
   })
   .then(card => {

      // fill
      $('#pokemon-detail-image-a').attr('href', card.imageUrlHiRes)
      $('#pokemon-detail-image').attr('src', card.imageUrl)
      $('#pokemon-detail-name').text(card.name)
      $('#pokemon-detail-type').text(card.types[0])

      card.attacks.forEach((skill, i) => {
         
         $('.pokemon-detail-skills').append(`

            <div class="pokemon-detail-each-skill">
               <h5>${skill.name}</h5>
               <p>${skill.text}</p>
            </div
         `)
      })

      // hide-show
      $('#pokemon-cards-wrapper').hide()
      $('#pokemon-detail-wrapper').show()
   })
}

function backToList() {

   event.preventDefault()

   $('#pokemon-cards-wrapper').show()
   $('#pokemon-detail-wrapper').hide()
}

function fillCurrentCardsWithTypes(types) {

      const promises = []

      for(let i in types) {

         promises.push(new Promise((resolve, reject) => {

            $.ajax({
      
               method: 'get',
               url: `http://localhost:3000/pokemon/getByTypes/${types[i]}`
            })
            .done(cards => {
               
               resolve(cards)
            })
            .fail(error => reject(error))
         }))
      }

      return promises

}

$('#form-pokemon-submit').click(function(event) {

   event.preventDefault()
   
   $.ajax({
      
      method: 'post',
      url: 'http://localhost:3000/pokemon/cards',
      data: {name: $('#pokemon-search-input').val()}
   })
   .done(cards => {

      fillTable(cards)
   })
   .fail(error => console.log(error))
})

$('.pokemon-tab').click(function(event) {

   $('.pokemon-tab').removeClass('tab-selected')
   this.classList.add('tab-selected')
   const typeName = $('.tab-selected span').text()   

   $.ajax({
      
      url: `http://localhost:3000/pokemon/getByTypes/${typeName}`,
      method: 'get'
   })
   .done(cards => {

      fillTable(cards)
   })
   .fail(error => console.log(error))
})

function pokemonPopulate() {

   const PokemonCards = []
    const PokemonTypes = []
  
    fillCurrentCards()
    .then(cards => {
  
      const tempStack = []
  
      cards.forEach((card) => {
  
        tempStack.push(card)
      })
  
      PokemonCards.push(tempStack)
      return fillPokemonTypes()
    })
    .then(types => {
  
      types.forEach((type) => PokemonTypes.push(type))
      return Promise.all(fillCurrentCardsWithTypes(types))
    })
    .then(cardsByType => {
      
      cardsByType.forEach((stack, i) => {
  
        let tempStack = []
  
        stack.forEach((card, j) => {
  
          tempStack.push(card)
        })
  
        PokemonCards.push(tempStack)
      })
    })
    .catch(error => console.log(error))
}


