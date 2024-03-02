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
        <div className='h-screen overflow-y-auto home'>
            <div className='container h-screen overflow-x-auto bg-white border-x-4 xl:border-[#701616]'>
                <Topbar searchInput={searchInput} setSearchInput={setSearchInput} orderBy={orderBy} setOrderBy={setOrderBy}/>
                <PokemonList pokemonList={pokemonList}/>
                <div className="flex flex-col items-center justify-center w-full mt-6 border-red-50">
                    <Separator orientation="horizontal"/>
                    <Button variant="outline" onClick={loadMorePokemon} className="mt-6 mb-5 w-fit">Show more pokemon</Button>
                </div>
            </div>
        </div>
    )
}

export default Home