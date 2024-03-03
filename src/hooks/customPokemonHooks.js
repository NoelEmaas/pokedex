import { useState, useEffect } from 'react';
import { getPokemonList, getPokemonBasicInfo, getPokemonCompleteInfo } from '@/services/api';
import { sortList } from '@/lib/utils';

export const useFetchPokemonList = () => {
    const [fullPokemonList, setFullPokemonList] = useState([]);
    const [pokemonList, setPokemonList] = useState([]);
    const [limitedPokemonList, setLimitedPokemonList] = useState([]);
    const [limit, setLimit] = useState(10);
    const [searchInput, setSearchInput] = useState('');
    const [orderBy, setOrderBy] = useState('0');
    const limitIncrement = 10;

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

    // Fetch pokemons basic info based on the limit, only if the search input is empty
    useEffect(() => {
        if (searchInput === '') {
            const limitedList = fullPokemonList.slice(limit - limitIncrement, limit);
            const fetchList = limitedList.map(async (pokemon) => {
                return await getPokemonBasicInfo(pokemon.name);
            });
            Promise.all([...limitedPokemonList, ...fetchList]).then((data) => {
                setPokemonList(sortList(data, orderBy));
                setLimitedPokemonList(sortList(data, orderBy));
            });
        }
    }, [fullPokemonList, limit, searchInput]);

    // Fetch pokemons basic info based on the search input
    useEffect(() => {
        if (searchInput !== '') {
            const filteredList = fullPokemonList.filter(pokemon => 
                pokemon.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                pokemon.id.padStart(3, "0").includes(searchInput.toLowerCase())
            );
            const fetchList = filteredList.map(async (pokemon) => {
                return await getPokemonBasicInfo(pokemon.name);
            });
            Promise.all(fetchList).then((data) => setPokemonList(sortList(data, orderBy)));
        }
    }, [fullPokemonList, searchInput]);

    // Sort the pokemon list based on the order by value
    useEffect(() => {
        setPokemonList(sortList(pokemonList, orderBy));
    }, [orderBy]);

    const loadMorePokemon = () => {
        setLimit(prevLimit => prevLimit + 10);
    }

    return { pokemonList, loadMorePokemon, setSearchInput, orderBy, setOrderBy };
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
        sortList
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