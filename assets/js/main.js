const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
let offset = 0;
const limit = 5;


function convertPokemonToHtml(pokemon){
  return `
    <li class="pokemon ${pokemon.pokeType}">
      <span class="number">#${pad(pokemon.pokeNumber, 3)}</span>
      <span class="name">${pokemon.pokeName}</span>

      <div class="detail">
        <ol class="types">
          ${pokemon.pokeTypes.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>

        <img src="${pokemon.pokePhoto}" alt="${pokemon.pokeName}">
      </div>
    </li>
  `
}

function loadPokemonItens(limit, offset){
  pokeApi.getPokemons(limit, offset).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) => `
      <li class="pokemon ${pokemon.pokeType}">
        <span class="number">#${pad(pokemon.pokeNumber, 3)}</span>
        <span class="name">${pokemon.pokeName}</span>

        <div class="detail">
          <ol class="types">
            ${pokemon.pokeTypes.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
          </ol>

          <img src="${pokemon.pokePhoto}" alt="${pokemon.pokeName}">
        </div>
      </li>
  `).join(' ');

    pokemonList.innerHTML += newHtml;
  })
  .finally(() => console.log("Requisição concluida!"));   // Execunta ao final de toda requisição independente se tiver error ou não
}

loadPokemonItens(limit, offset);

loadMoreButton.addEventListener('click', () => {
  offset += limit;
  const qtdRecordNextPage = offset + limit;

  if(qtdRecordNextPage >= maxRecords){
    const newLimit = maxRecords - offset;

    loadPokemonItens(limit, offset);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  }else{
    loadPokemonItens(limit, offset);
  }
});

function pad(str, length) {
  const resto = length - String(str).length;
  return '0'.repeat(resto > 0 ? resto : '0') + str;
}
