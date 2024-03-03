import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { useFetchPokemonList } from "@/hooks/customPokemonHooks";
import PokemonList from '@/components/PokemonList';
import Topbar from '@/components/Topbar';

const Home = (props) => {
    const { 
        pokemonList,
        loadMorePokemon,
        searchInput,
        setSearchInput,
        orderBy,
        setOrderBy
    } = useFetchPokemonList();

    return (
        <div className='h-screen'>
            <div className='container bg-white xl:border-[#262626]'>
                <Topbar setSearchInput={setSearchInput} orderBy={orderBy} setOrderBy={setOrderBy}/>
                <PokemonList pokemonList={pokemonList}/>
                {(searchInput === '' || pokemonList.length > 0) && (
                    <div className="flex flex-col items-center justify-center w-full mt-6 border-red-50">
                        <Separator orientation="horizontal"/>
                        <Button variant="outline" onClick={loadMorePokemon} className="mt-6 mb-5 w-fit">Show more pokemon</Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home