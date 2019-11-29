const currentCards = [];

function fillCurrentCards(e, number) {
  e.preventDefault();
  // console.log(number)
  // $.ajax({

  //    method: 'get',
  //    url: 'http://localhost:3000/pokemon/cards'
  // })
}

function pokemonPopulate() {
  $.ajax({
    method: "get",
    url: "http://localhost:3000/pokemon/cards"
  })
    .done(cards => {
      for (let i in cards) {
        $("#pokemon-card-board").append(`
   
            <div class="pokemon-card">
            
               <a href="${cards[i].imageUrlHiRes}">

                  <img src="${cards[i].imageUrl}" alt="${cards[i].name}">
               </a>

               <h5 class="pokemon-card-name">${cards[i].name}</h5>
            </div>
         `);
      }
    })
    .fail(error => console.log(error));
}
