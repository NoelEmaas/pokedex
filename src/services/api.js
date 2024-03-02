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

        const movesData = await Promise.all(response.data.moves.map(async (moveData) => {
            return await getMoveData(moveData.move.url);
        }));

        const id = response.data.id;
        const imageURL = `${POKEMON_IMAGE_BASE_URL}/${String(id).padStart(3, "0")}.png`;
        const specieData = await getSpecieData(response.data.species.url);
        const evolutionChain = await getEvolutionSequence(specieData.evolution_chain_url);
        const encounterAreas = await getEncounterAreas(response.data.location_area_encounters);
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
            moves: movesData.filter(data => data !== null),
            specie: specieData,
            evolution_sequence: evolutionChain,
            encounter_areas: encounterAreas,
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

const getMoveData = async (moveUrl) => {
    try {
        const response = await axios.get(moveUrl);
        const moveData = {
            name : transformString(response.data.name),
            accuracy: response.data.accuracy,
            power: response.data.power,
            pp: response.data.pp,
        }
        return moveData;
    } catch (error) {
        console.error('Error fetching move data:', error);
        return null;
    }
}

const getSpecieData = async (specieUrl) => {
    try {
        const response = await axios.get(specieUrl);
        const speciData = {
            base_happiness: response.data.base_happiness,
            capture_rate: response.data.capture_rate,
            color: response.data.color.name,
            is_legendary: response.data.is_legendary,
            is_mythical: response.data.is_mythical,
            evolution_chain_url: response.data.evolution_chain.url
        }
        return speciData;
    } catch (error) {
        console.error('Error fetching specie data:', error);
        return null;
    }
}

const getEvolutionSequence = async (evolutionChainUrl) => {
    try {
        const response = await axios.get(evolutionChainUrl);
        const evolutionChain = response.data.chain;
        const sequence = [];

        // Recursively traverse the evolution chain to get the complete sequence
        function traverseChain(chain) {
            sequence.push(chain.species.name);
            chain.evolves_to.forEach(evolution => {
                traverseChain(evolution);
            });
        }

        traverseChain(evolutionChain);
        return sequence;
    } catch (error) {
        console.error('Error fetching evolution chain:', error);
        return null;
    }
}

const getEncounterAreas = async (locationAreaUrl) => {
    try {
        const response = await axios.get(locationAreaUrl);
        const encounterAreas = response.data.map(area => {
            return transformString(area.location_area.name);
        });
        return [...encounterAreas];
    } catch (error) {
        console.error('Error fetching encounter areas:', error);
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