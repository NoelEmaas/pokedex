import { useState, useEffect } from 'react';
import { getPokemonList, getPokemonBasicInfo, getPokemonCompleteInfo } from '../services/api';

export const useFetchPokemonList = () => {
    const [fullPokemonList, setFullPokemonList] = useState([]);
    const [pokemonList, setPokemonList] = useState([]);
    const [limit, setLimit] = useState(10);
    const [searchInput, setSearchInput] = useState('');
    const [orderBy, setOrderBy] = useState('0');

    const sortPokemonList = (list, order) => {
        const sortedList = [...list]; 
        if (order === '0') {
            return sortedList.sort((a, b) => a.id - b.id);
        }
        else if (order === '1') {
            return sortedList.sort((a, b) => b.id - a.id);
        }
        else if (order === '2') {
            return sortedList.sort((a, b) => a.name.localeCompare(b.name));
        }
        else if (order === '3') {
            return sortedList.sort((a, b) => b.name.localeCompare(a.name));
        }
    }

    // Fetch all pokemons and store them in local storage
    useEffect(() => {
        const fetchPokemons = async () => {
            const cachedPokemonList = localStorage.getItem('fullPokemonList');
            if (cachedPokemonList) {
                setFullPokemonList(JSON.parse(cachedPokemonList));
            }
            else {
                const response = await getPokemonList();
                setFullPokemonList(response);
                localStorage.setItem('fullPokemonList', JSON.stringify(response));
            }
        };

        fetchPokemons();
    }, []);

    // Fetch pokemons based on the limit, only if the search input is empty
    useEffect(() => {
        if (searchInput === '') {
            const limitedList = fullPokemonList.slice(0, limit);
            const fetchList = limitedList.map(async (pokemon) => {
                return await getPokemonBasicInfo(pokemon.name);
            });
            Promise.all(fetchList).then((data) => setPokemonList(data));
        }
    }, [fullPokemonList, limit, searchInput]);

    // Fetch pokemons based on the search input
    useEffect(() => {
        if (searchInput !== '') {
            const filteredList = fullPokemonList.filter(pokemon => 
                pokemon.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                pokemon.id.padStart(3, "0").includes(searchInput.toLowerCase())
            );
            const fetchList = filteredList.map(async (pokemon) => {
                return await getPokemonBasicInfo(pokemon.name);
            });
            Promise.all(fetchList).then((data) => setPokemonList(data));
        }
    }, [fullPokemonList, searchInput]);

    // Sort the pokemon list based on the order by value
    useEffect(() => {
        setPokemonList(sortPokemonList(pokemonList, orderBy));
    }, [orderBy]);

    const loadMorePokemon = () => {
        setLimit(prevLimit => prevLimit + 10);
    }

    return { pokemonList, loadMorePokemon, searchInput, setSearchInput, orderBy, setOrderBy };
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