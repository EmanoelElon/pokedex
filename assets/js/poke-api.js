const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
  const pokemon = new Pokemon()

  pokemon.pokeNumber = pokeDetail.id;
  pokemon.pokeName = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.pokeType = type;
  pokemon.pokeTypes = types;
  pokemon.pokePhoto = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

pokeApi.getPokemonsDetails = (pokemon) => {
  return fetch(pokemon.url)
          .then((response) => response.json())
          .then(convertPokeApiDetailToPokemon);
}

pokeApi.getPokemons = (limit = 5, offset = 0) =>  {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  //https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}
  //https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0

  return fetch(url)   // Faz a requisição
    //retorna HTTP Response
    .then((response) => response.json())    // Transforma o HTTP response em uma promise Json
    .then((jsonBody) => jsonBody.results)   // Pega a lista de pokens
    .then((pokemons) => pokemons.map((pokeApi.getPokemonsDetails)))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => console.log(error));    // Executa se acontecer algum erro
}
