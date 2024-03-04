
const PokemonDescription = ({ description }) => {
    return (
        <div className="mb-8">
            <h1 className="mb-5 text-xl text-white pokemon-name">About</h1>
            <p className="text-sm text-gray-400">
                {description}
            </p>
        </div>
    );
}

export default PokemonDescription;