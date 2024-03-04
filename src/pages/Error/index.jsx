import { Link } from "react-router-dom";

import Pokeball from "@/assets/pokeball.png";
import { Button } from "@/components/ui/button";

const ErrorPage = () => {
    return (
        <div className="h-screen w-screen bg-[#010101] flex flex-col items-center justify-center px-10">
            <div className="flex flex-row items-center mb-7">
                <p className="text-5xl font-bold text-white">4</p>
                <img src={Pokeball} alt="pokeball" className="w-[60px]"/>
                <p className="text-5xl font-bold text-white">4</p>
            </div>
            <h1 className="text-sm text-center text-white sm:text-lg">Oops! It seems you've wandered too far while searching for a Pokemon.</h1>
            <h1 className="mb-4 text-sm text-center text-white sm:text-lg">Don't worry, let's head back to the Pokecenter and try again!</h1>
            <Link to="/">
                <Button variant="outline" className="mt-4 text-gray-400 w-fit hover:text-gray-200 bg-[#050911] border-[#373A41] hover:bg-[#0a111d] gap-x-2">
                    Go back home
                </Button>
            </Link>
        </div>
    )
}

export default ErrorPage;