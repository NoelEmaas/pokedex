import { useState, useEffect } from 'react';
import { getPokemonList, getPokemonBasicInfo, getPokemonCompleteInfo } from '../services/api';

export const useFetchPokemonList = (initialLimit) => {
    const [pokemonList, setPokemonList] = useState([]);
    const [limitResponse, setLimitResponse] = useState([]);
    const [limit, setLimit] = useState(initialLimit);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                // Check if there's a cached list of pokemons
                const cachedPokemonList = localStorage.getItem('pokemonList');
                if (cachedPokemonList) {
                    setLimitResponse(JSON.parse(cachedPokemonList).slice(0, limit));
                }
                // If not, fetch the list from the API and cache it
                else {
                    const response = await getPokemonList();
                    setLimitResponse(response.slice(0, limit));
                    localStorage.setItem('pokemonList', JSON.stringify(response));
                }

                // Fetch basic info for each pokemon in the list
                const list = await Promise.all(
                    limitResponse.map(async (pokemon) => {
                        return await getPokemonBasicInfo(pokemon.name);
                    })
                );
                setPokemonList(list);
            } catch (error) {
                console.error('Error fetching Pokemon data:', error);
            }
        };

        fetchPokemons();
    }, [limit, limitResponse]);

    const loadMorePokemon = () => {
        const increment = 10;
        setLimit(prevLimit => prevLimit + increment);
    }

    return { pokemonList, loadMorePokemon };
}

export const useFetchPokemonDetails = (pokemonID) => {
    const [pokemonDetails, setPokemonDetails] = useState(null);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const response = await getPokemonCompleteInfo(pokemonID);
                setPokemonDetails(response);
            } catch (error) {
                console.error('Error fetching Pokemon details:', error);
            }
        };

        fetchPokemonDetails();
    }, [pokemonID]);

    return pokemonDetails;
}

export const useTypeIconsLoader = (types) => {
    const [icons, setIcons] = useState({});

    useEffect(() => {
        const importIcon = async (type) => {
            try {
                const fullIconModule = await import(`../assets/type_icons/${type.toLowerCase()}_full.png`);
                const iconModule = await import(`../assets/type_icons/${type.toLowerCase()}.png`);

                setIcons(prevIcons => ({
                    ...prevIcons,
                    [type]: iconModule.default,
                    [`${type}_full`]: fullIconModule.default
                }));
            } catch (error) {
                console.error(`Error importing image for type '${type}':`, error);
            }
        };

        types.forEach(type => {
            importIcon(type);
        });
    }, [types]);

    return icons;
}