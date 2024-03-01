import './App.css'
import { Button } from './components/ui/button'
import useFetchPokemonList from './hooks/customPokemonHooks';

function App() {
    const pokemonList = useFetchPokemonList();

    return (
        <>
            <Button> Hello, World </Button>
        </>
    )
}

export default App
