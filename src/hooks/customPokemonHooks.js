import { useState, useEffect } from 'react';
import { getPokemonList, getPokemonBasicInfo, getPokemonCompleteInfo } from '../services/api';

export const useFetchPokemonList = () => {
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

export const useTypeIconsLoader = (types) => {
    const [icons, setIcons] = useState({});

    useEffect(() => {
        const importIcon = async (type) => {
            try {
                const iconModule = await import(`../assets/type_icons/${type.toLowerCase()}_full.png`);
                setIcons(prevIcons => ({
                    ...prevIcons,
                    [type]: iconModule.default
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