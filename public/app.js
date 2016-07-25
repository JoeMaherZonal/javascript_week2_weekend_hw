window.onload = function(){
  showLocalStorage();

  var searchBtn = document.getElementById('search-btn');
  searchBtn.onclick = renderPage;

  //alt way of calling main with a request.
  //getAjax(url, main).
}

//Another good way of of declaring function is:
//var functionName = function(){
  //stuff
// }

// var getAjax(url, callback) {
//   var request = new XMLHttpRequest();
//   request.open("GET", url);
//   request.onload = function(){
//     if(request.status === 200) {
//       var jsonString = request.responseText;
//       result = JSON.parse(jsonString)
//       //inits main once data loaded
//       main(result)
//     }
//     if(request.status != 200){
//       console.log('Couldnt find pokemon, probably doesnt exist')
//     }
//   }
// }

function showLocalStorage(){
  var localPokemons = JSON.parse(localStorage.getItem('pokemon')) || [];
  console.log(localPokemons)
}

function renderPage(){
  console.log("Rendering...")
  pokemondFound = false;
  var localPokemons = JSON.parse(localStorage.getItem('pokemon')) || [];
  var searchCrit = document.getElementById('search-crit');
  var pokemonId = parseInt(searchCrit.value);

  for(poke of localPokemons){
    if(poke.id === pokemonId){
      pokemondFound = true;
      console.log('Found pokemon locally...')
      renderPokemon(poke)
    }
  }

  if(pokemondFound === false){    
    console.log('Couldnt find pokemon..')
    grabPokemon(pokemonId);
  }

}

function grabPokemon(n){
  //variables needed
  var localPokemons = JSON.parse(localStorage.getItem('pokemon')) || [];
  var searchCrit = document.getElementById('search-crit');

  //attemp load
  console.log('attemtping to load from API...')
  var url = 'http://pokeapi.co/api/v2/pokemon/'+ n;
  var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function(){
      if(request.status === 200) {
        var jsonString = request.responseText;
        pokemon = JSON.parse(jsonString)
        //console checks
        console.log(pokemon.name,"loaded!")
        //store pokemon locally;
        localPokemons.push(pokemon)
        localStorage.setItem('pokemon', JSON.stringify(localPokemons))
        renderPokemon(pokemon)
      }
      if(request.status != 200){
        console.log('Couldnt find pokemon, probably doesnt exist')
      }
    }
  request.send( null );
}

function showTypes(pokemon){
  var typesList = document.getElementById('types-list');
  typesList.innerHTML = ''

  for(type of pokemon.types){
    var li = document.createElement('li')
    var typeDiv = document.createElement('Div');
    typeDiv.innerText = type.type.name.replace(/\b\w/g, l => l.toUpperCase())
    typeDiv.id = 'poke-types'
    typeDiv.id = type.type.name + '-type'
    li.appendChild(typeDiv)
    typesList.appendChild(li)

  }
}

function renderPokemon(pokemon){
  var title = document.getElementById('title');
  var image = document.getElementById('pokemon-image')
  image.src = getImageFilePath(pokemon);
  new ColumnChart(pokemon);
  showTypes(pokemon)
  buildStatsBox(pokemon);
}

function getImageFilePath(pokemon) {
  //I didn't like the sprites provided by the Pokemon API
  //So this rips much better images from the official pokemon website!
  var filePath = 'http://assets.pokemon.com/assets/cms2/img/pokedex/full/'
  if(pokemon.id < 10){
    filePath = filePath + '00' + pokemon.id  + '.png'
  }else if(pokemon.id > 9 && pokemon.id < 100){
    filePath = filePath + '0' + pokemon.id  + '.png'
  }else{
    filePath = filePath + pokemon.id  + '.png'
  }
  return filePath
}

function buildStatsBox(pokemon){
  clearStatsBox();

  var background = document.getElementById('pokemon-stats')
  background.style.backgroundColor = '#3c59a5';

  var heightTitle = document.getElementById('height-title')
  var h3 = document.createElement('h3');
  h3.innerText = 'Height';
  heightTitle.appendChild(h3);

  var heightData = document.getElementById('height-data')
  var h5 = document.createElement('h5');
  height = pokemon.height / 10;
  console.log('Pokemon height: ', height)
  h5.innerText = ' ' + height + ' M';
  heightData.appendChild(h5)

  var weightTitle = document.getElementById('weight-title')
  var h3 = document.createElement('h3');
  h3.innerText = 'Weight';
  weightTitle.appendChild(h3);

  var weightData = document.getElementById('weight-data')
  var h5 = document.createElement('h5');
  weight = pokemon.weight / 10;
  console.log('Pokemon weight: ', weight)
  h5.innerText = ' ' + weight + ' KG';
  weightData.appendChild(h5)

}

function clearStatsBox(){
  var heightTitle = document.getElementById('height-title');
  heightTitle.innerHTML = '';
  var heightData = document.getElementById('height-data');
  heightData.innerHTML = '';
  var weightTitle = document.getElementById('weight-title');
  weightTitle.innerHTML = '';
  var weightData = document.getElementById('weight-data');
  weightData.innerHTML = '';

}






