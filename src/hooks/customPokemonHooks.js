import { useEffect, useState } from 'react';

import { sortList } from '@/lib/utils';
import { getPokemonBasicInfo, getPokemonCompleteInfo, getPokemonList } from '@/services/api';

export const useFetchPokemonList = (limit, sortBy, setLoading, setLoadingMore) => {
    const [pokemonList, setPokemonList] = useState([]);
    const fullPokemonList = useFetchAllPokemon(setLoading);

    useEffect(() => {
        const fetchPokemonList = async () => {
            setLoadingMore(true);
            try {
                const limitedList = fullPokemonList.slice(limit - 10, limit);
                const fetchedPokemonList = await Promise.all(limitedList.map(async (pokemon) => {
                    return await getPokemonBasicInfo(pokemon.name);
                }));
                const newPokemonList = [...pokemonList, ...fetchedPokemonList];
                setPokemonList(sortList(newPokemonList, sortBy));
            } catch (error) {
                console.error('Error fetching Pokemon list:', error);
            } finally {
                setLoadingMore(false);
            }
        };
    
        fetchPokemonList();
    }, [fullPokemonList, limit]);

    return { pokemonList, setPokemonList };
}

export const useFetchSearchResultPokemonList = (searchQuery, sortBy, setLoading) => {
    const [searchResultPokemonList, setSearchResultPokemonList] = useState([]);
    const fullPokemonList = useFetchAllPokemon();

    useEffect(() => {
        const fetchSearchResultPokemonList = async () => {
            setLoading(true);
            try {
                if (searchQuery !== '') {
                    const filteredList = fullPokemonList.filter(pokemon => 
                        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        pokemon.id.padStart(3, "0").includes(searchQuery.toLowerCase())
                    );
                    const fetchedPokemonList = await Promise.all(filteredList.map(async (pokemon) => {
                        return await getPokemonBasicInfo(pokemon.name);
                    }));
                    setSearchResultPokemonList(sortList(fetchedPokemonList, sortBy));
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching search result Pokemon list:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchSearchResultPokemonList();
    }, [fullPokemonList, searchQuery]);

    return { searchResultPokemonList, setSearchResultPokemonList };
}

export const useFetchPokemonDetails = (pokemonID, setLoading) => {
    const [pokemonDetails, setPokemonDetails] = useState(null);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            setLoading(true);
            try {
                const response = await getPokemonCompleteInfo(pokemonID);
                setPokemonDetails(response);
            } catch (error) {
                console.error('Error fetching Pokemon details:', error);
            } finally {
                setLoading(false);
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

// Fetch all pokemons and store them in local storage
const useFetchAllPokemon = (setLoading = () => {}) => {
    const [fullPokemonList, setFullPokemonList] = useState([]);
    
    useEffect(() => {
        const fetchPokemons = async () => {
            const cachedPokemonList = localStorage.getItem('fullPokemonList');
            if (cachedPokemonList) {
                setFullPokemonList(JSON.parse(cachedPokemonList));
                setLoading(false);
            }
            else {
                const response = await getPokemonList();
                setFullPokemonList(response);
                localStorage.setItem('fullPokemonList', JSON.stringify(response));
                setLoading(false);
            }
        };

        fetchPokemons();
    }, []);

    return fullPokemonList;
}