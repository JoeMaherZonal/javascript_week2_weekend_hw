var ColumnChart = function(pokemon){
  var container = document.getElementById('chart-container');
  var pokeSpeed = pokemon.stats[0].base_stat
  var pokeAttack = pokemon.stats[4].base_stat
  var pokeSpAttack = pokemon.stats[2].base_stat
  var pokeDefence = pokemon.stats[3].base_stat
  var pokeSpDef = pokemon.stats[1].base_stat
  var pokeHp = pokemon.stats[5].base_stat

  var chart = new Highcharts.Chart({
    chart: {
      type: 'column',
      renderTo: container
    },

    title: {
      text: "Base Stats"
    },

    xAxis: {
        categories: ['Attack', 'Sp. Att', 'Defence', 'Sp. Def', 'Speed', 'Hp']
    },

    plotOptions: {
        series: {
            animation: {
                duration: 2000,
                easing: 'easeOutBounce'
            }
        }
    },

    series: [{
      color: '#3c59a5',
      name: pokemon.name.replace(/\b\w/g, l => l.toUpperCase()),
        data: [pokeAttack, pokeSpAttack, pokeDefence, pokeSpDef, pokeSpeed, pokeHp]
    }]

  })
}