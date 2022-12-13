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

const pokemonList = document.getElementById("pokemonList");

pokeApi.getPokemons().then((pokemons = []) => {
  const newHtml = pokemons.map(convertPokemonToHtml).join('');
  pokemonList.innerHTML = newHtml;
})
.finally(() => console.log("Requisição concluida!"));   // Execunta ao final de toda requisição independente se tiver error ou não

function pad(str, length) {
  const resto = length - String(str).length;
  return '0'.repeat(resto > 0 ? resto : '0') + str;
}
