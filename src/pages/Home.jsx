import PokemonList from '@/components/PokemonList';
import Topbar from '@/components/Topbar';

const Home = (props) => {
    return (
        <div className='h-screen home'>
            <div className='container h-full bg-white border-x-4 xl:border-[#701616]'>
                <Topbar />
                <PokemonList />
            </div>
        </div>
    )
}

export default Home