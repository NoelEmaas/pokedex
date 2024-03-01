import './App.css'
import { Button } from './components/ui/button'
import { useEffect } from 'react';
import { getPokemonList, getPokemonBasicInfo } from './lib/api';

function App() {
    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await getPokemonList();
                const pokemonListWithBasicInfo = await Promise.all(
                    response.map(async (pokemon) => {
                      return await getPokemonBasicInfo(pokemon);
                    })
                );
                console.log(pokemonListWithBasicInfo);
            } catch (error) {
              console.error('Error fetching Pokemon data:', error);
            }
        };

        fetchPokemons();
    }, []);
  

    return (
        <>
            <Button> Hello, World </Button>
        </>
    )
}

export default App
