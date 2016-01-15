
var ROOT_URL = 'http://pokeapi.co/api/v1/';

function fetchListOfPokemon( callback ) {
    fetch(ROOT_URL + 'pokedex/1/')
      .then((response) => response.json())
      .then((responseData) => {
      	return callback ( null, responseData );
      })
      .catch((error) => {
        return callback (error );
      });
}

// Exports
module.exports = {
  fetchListOfPokemon: fetchListOfPokemon
};