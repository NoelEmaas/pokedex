import axios from 'axios';
import { transformString } from '@/lib/utils';
import pokemonTypes from '../../data/pokemon_types.json';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';
const POKEMON_IMAGE_BASE_URL = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full';

export const getPokemonList = async () => {
    try {
        const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon?limit=1010&offset=0`);
        const pokemonList = response.data.results.map(pokemon => {
            return {
                name: pokemon.name,
                id: pokemon.url.split('/')[6],
                url: pokemon.url
            }
        });
        return pokemonList;
    } catch (error) {
        console.error('Error fetching Pokemon list:', error);
        return null;
    }
}

export const getPokemonBasicInfo = async (pokemonName) => {
    try {
        const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon/${pokemonName}`);
        const id = response.data.id;
        const imageURL = `${POKEMON_IMAGE_BASE_URL}/${String(id).padStart(3, "0")}.png`;
        const pokemonBasicInfo = {
            id,
            name: response.data.name,
            image: imageURL,
            types: response.data.types.map(type => transformString(type.type.name))
        }

        return pokemonBasicInfo;
    } catch (error) {
        console.error('Error fetching Pokemon basic info:', error);
        return null;
    }
}

export const getPokemonCompleteInfo = async (pokemonID) => {
    try {
        const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon/${pokemonID}`);

        const abilitiesData = await Promise.all(response.data.abilities.map(async (abilityData) => {
            return await getAbilityData(abilityData.ability.url);
        }));

        const id = response.data.id;
        const imageURL = `${POKEMON_IMAGE_BASE_URL}/${String(id).padStart(3, "0")}.png`;
        const description = await getDescription(response.data.species.url);
        const stats = getStats(response);
        const types = response.data.types.map(type => transformString(type.type.name))
        const typesInfo = getTypeInfo(types);

        const pokemonCompleteInfo = {
            id,
            name: response.data.name,
            image: imageURL,
            height: response.data.height,
            weight: response.data.weight,
            abilities:  abilitiesData.filter(data => data !== null),
            description,
            stats,
            types,
            typesInfo,
        }
        return pokemonCompleteInfo;
    } catch (error) {
        console.error('Error fetching Pokemon complete info:', error);
        return null;
    }
}

const getAbilityData = async (abilityUrl) => {
    try {
        const response = await axios.get(abilityUrl);
        const englishEffectEntry = response.data.effect_entries.find(entry => entry.language.name === 'en');
        const abilityData = {
            name: response.data.name,
            effect: englishEffectEntry ? englishEffectEntry.effect : 'No English description available'
        };
        return abilityData;
    } catch (error) {
        console.error('Error fetching ability data:', error);
        return null;
    }
}

const getDescription = async (specieUrl) => {
    try {
        const response = await axios.get(specieUrl);
        const entries = response.data.flavor_text_entries;
        const englishEntry = entries.find(entry => entry.language.name === 'en');
        if (englishEntry) {
            const description = englishEntry.flavor_text;
            return description;
        } else {
            return "No English description available.";
        }
    } catch (error) {
        console.error('Error fetching specie description:', error);
        return null;
    }
}

const getStats = (pokemon) => {
    const stats = {};
    pokemon.data.stats.forEach(stat => {
        const statName = stat.stat.name;
        const statValue = stat.base_stat;
        stats[statName] = statValue;
    });

    return stats;
}

const getTypeInfo = (types) => {
    const typesInfo = {}

    for (const type of types) {
        const strengths = pokemonTypes[type].strengths;
        const weaknesses = pokemonTypes[type].weaknesses;
        const resistances = pokemonTypes[type].resistances;
        const vulnerabilities = pokemonTypes[type].vulnerabilities;
        
        typesInfo[type] = {
            strengths,
            weaknesses,
            resistances,
            vulnerabilities
        };
    }

    return typesInfo;
}