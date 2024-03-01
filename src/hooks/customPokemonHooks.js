import { useState, useEffect } from 'react';
import { getPokemonList, getPokemonBasicInfo, getPokemonCompleteInfo } from '../services/api';

const useFetchPokemonList = () => {
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await getPokemonList();
                const pokemonListWithBasicInfo = await Promise.all(
                    response.map(async (pokemon) => {
                        return await getPokemonBasicInfo(pokemon.name);
                    })
                );
                // console.log(pokemonListWithBasicInfo);
                console.log(getPokemonCompleteInfo(pokemonListWithBasicInfo[0]));
                setPokemonList(pokemonListWithBasicInfo);
            } catch (error) {
                console.error('Error fetching Pokemon data:', error);
            }
        };

        fetchPokemons();
    }, []);

    return pokemonList;
}

export default useFetchPokemonList;