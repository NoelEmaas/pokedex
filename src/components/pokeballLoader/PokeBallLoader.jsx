import './index.css';

const PokeBallLoader = () => {
    return (
        <div class="wrapper bg-[#010101] h-screen w-screen flex flex-col items-center justify-center">
            <div class="pokeball mb-8">
            </div>
            <p className='text-lg font-bold text-white'>Loading Pokedex ...</p>
        </div>
    );
};

export default PokeBallLoader;
