import PokemonList from '@/components/PokemonList';

const Home = (props) => {
    return (
        <div className='h-screen home'>
            <div className='container h-full bg-white border-x-4 border-[#701616]'>
                <PokemonList />
            </div>
        </div>
    )
}

export default Home