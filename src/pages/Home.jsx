import PokemonList from '@/components/PokemonList';
import Topbar from '@/components/Topbar';

const Home = (props) => {
    return (
        <div className='h-screen overflow-y-auto home'>
            <div className='container h-screen overflow-x-auto bg-white border-x-4 xl:border-[#701616]'>
                <Topbar />
                <PokemonList />
            </div>
        </div>
    )
}

export default Home