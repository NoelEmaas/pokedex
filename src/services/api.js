import axios from 'axios';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';
const POKEMON_IMAGE_BASE_URL = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full';

export const getPokemonList = async (limit = 10) => {
    try {
        const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}`);
        const pokemonList = response.data.results;
        return pokemonList;
    } catch (error) {
        console.error('Error fetching Pokemon list:', error);
    }
}

export const getPokemonBasicInfo = async (pokemon) => {
    try {
        const response = await axios.get(pokemon.url);
        const id = response.data.id;
        const imageURL = `${POKEMON_IMAGE_BASE_URL}/${String(id).padStart(3, "0")}.png`;
        const pokemonBasicInfo = {
            id,
            name: response.data.name,
            image: imageURL,
            types: response.data.types.map(type => type.type.name)
        }

        return pokemonBasicInfo;
    } catch (error) {
        console.error('Error fetching Pokemon basic info:', error);
    }
}

