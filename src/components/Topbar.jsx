import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect } from "react";

const Topbar = ({ searchInput, setSearchInput, orderBy, setOrderBy }) => {
    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchInput(value);
    };

    return (
        <div className="w-full border-b topbar pt-[30px] pb-[20px] flex lg:flex-row flex-col justify-between">
            <div className="mb-6 lg:mb-0">
                <h1 className='pb-4 text-6xl title'>Pokedex</h1>
                <p>A database of Pokémon information at your fingertips.</p>
            </div>
            <div className="flex items-end gap-x-4">
                <Input className="lg:w-[400px] w-full" type="text" placeholder="Search pokemon ..." onChange={handleInputChange} value={searchInput}/>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                            </svg>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Order by:</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={orderBy} onValueChange={setOrderBy}>
                            <DropdownMenuRadioItem value="0">Id number (ascending)</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="1">Id number (descending)</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="2">Name (a - z)</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="3">Name (z - a)</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default Topbar