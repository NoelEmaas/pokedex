import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { useFetchPokemonList } from "@/hooks/customPokemonHooks";
import PokemonList from '@/components/PokemonList';
import Topbar from '@/components/Topbar';
import { ReloadIcon } from "@radix-ui/react-icons"

const Home = (props) => {
    const { 
        pokemonList,
        loadMorePokemon,
        searchInput,
        setSearchInput,
        orderBy,
        setOrderBy,
        loadingMore,
        loadingPokemon
    } = useFetchPokemonList();

    const ShowMoreButton = () => {
        if (searchInput !== '' || pokemonList.length === 0 || pokemonList.length === 1010) return null;
        
        if (loadingMore) return (
            <Button disabled className="mt-6 mb-5 w-fit">
                <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
                Loading more pokemon ...
            </Button>
        )

        return <Button variant="outline" onClick={loadMorePokemon} className="mt-6 mb-5 text-gray-600 w-fit">Show more pokemon</Button>
    }

    const DisplayNoResult = () => {
        if (pokemonList.length === 0 && searchInput !== '') {
            return (
                <div className="flex flex-col items-center justify-center w-full mt-6 border-red-50 h-[300px]">
                    <p className="text-lg font-bold text-red-500 md:text-xl">No pokemon found</p>
                </div>
            )
        }
    }

    const LoadPokemonList = () => {
        if (loadingPokemon) {
            return <div>Loading...</div>
        }
        else {
            return <PokemonList pokemonList={pokemonList}/>
        }
    }

    return (
        <div className='h-screen bg-[#010101] overflow-y-auto'>
            <div className='container xl:border-[#262626]'>
                <Topbar setSearchInput={setSearchInput} orderBy={orderBy} setOrderBy={setOrderBy}/>
                {LoadPokemonList()}
                {DisplayNoResult()}
                <div className="flex flex-col items-center justify-center w-full mt-6 border-red-50">
                    <Separator orientation="horizontal"/>
                    {ShowMoreButton()}
                </div>
            </div>
        </div>
    )
}

export default Home