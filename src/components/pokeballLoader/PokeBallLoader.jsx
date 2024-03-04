import './index.css';

const PokeBallLoader = () => {
    return (
        <div className="wrapper bg-[#010101] h-screen w-screen flex flex-col items-center justify-center">
            <div className="mb-8 pokeball">
            </div>
            <p className='text-lg font-bold text-white'>Loading Pokedex ...</p>
        </div>
    );
};

export default PokeBallLoader;
