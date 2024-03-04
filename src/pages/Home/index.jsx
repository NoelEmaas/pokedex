import { useEffect, useState } from 'react';

import { sortList } from '@/lib/utils';
import Pokedex from "@/assets/pokedex.png";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons"
import { Separator } from "@/components/ui/separator"
import PokemonList from '@/pages/Home/components/PokemonList';
import SearchSortPanel from '@/pages/Home/components/SearchSortPanel';
import { useFetchPokemonList, useFetchSearchResultPokemonList } from "@/hooks/customPokemonHooks";

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('0');
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(true);

    const { pokemonList, setPokemonList } = useFetchPokemonList(limit, sortBy, setLoading);
    const { searchResultPokemonList, setSearchResultPokemonList } = useFetchSearchResultPokemonList(searchQuery, sortBy, setLoading);

    useEffect(() => {
        setPokemonList(sortList(pokemonList, sortBy));
        setSearchResultPokemonList(sortList(searchResultPokemonList, sortBy));
    }, [sortBy]);

    const ShowMoreButton = () => {
        if ((searchQuery === '' && pokemonList.length === 0) ||
            (searchQuery !== '' && searchResultPokemonList.length === 9)) {
                return null;
        }
        
        if (loading) return (
            <>
                <Separator orientation="horizontal" className="bg-[#373A41]"/>            
                <Button disabled className="mt-6 mb-5 w-fit">
                    <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
                    Loading more pokemon ...
                </Button>
            </>
        )

        return (
            <>
                <Separator orientation="horizontal" className="bg-[#373A41]"/>
                <Button 
                    variant="outline" 
                    onClick={() => setLimit(prevLimit => prevLimit + 10)} 
                    className="mt-6 mb-5 text-gray-400 w-fit hover:text-gray-200 bg-[#050911] border-[#373A41] hover:bg-[#0a111d]"
                >
                    Show more pokemon
                </Button>
            </>
        );
    }

    const DisplayNoResult = () => {
        if (searchResultPokemonList.length === 0 && searchQuery !== '') {
            return (
                <div className="flex flex-col items-center justify-center w-full mt-6 border-red-50 h-[300px]">
                    <p className="text-lg font-bold text-red-500 md:text-xl">No pokemon found</p>
                </div>
            )
        }
    }

    const LoadPokemonList = () => {
        if (searchQuery !== '') 
            return <PokemonList pokemonList={searchResultPokemonList}/>
        return <PokemonList pokemonList={pokemonList}/>
    }

    return (
        <div className='h-screen bg-[#010101] overflow-y-auto'>
            <div className='container xl:border-[#262626]'>
                <div className='flex items-center justify-center w-full mt-5 mb-5'>
                    <img src={Pokedex} alt="pokedex" className='md:w-[300px] w-[200px]'/>
                </div>
                <SearchSortPanel 
                    setSearchQuery = { setSearchQuery } 
                    sortBy = { sortBy } 
                    setSortBy = { setSortBy } 
                />
                {LoadPokemonList()}
                {DisplayNoResult()}
                <div className="flex flex-col items-center justify-center w-full mt-6 border-red-50">
                    {ShowMoreButton()}
                </div>
            </div>
        </div>
    )
}

export default Home