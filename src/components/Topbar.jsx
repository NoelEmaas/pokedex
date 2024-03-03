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
import { useState } from "react"
import { MagnifyingGlassIcon, MixerHorizontalIcon } from '@radix-ui/react-icons';

const Topbar = ({ setSearchInput, orderBy, setOrderBy }) => {
    const [searchQuery, setSearchQuery] = useState('');
    
    const handleInputChange = (event) => {
        const value = event.target.value;
        if (value === '') setSearchInput('');
        setSearchQuery(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchInput(searchQuery);
    }

    return (
        <div className="w-full topbar pt-[30px] pb-[20px] flex flex-col justify-between gap-y-7">
            <h1 className='text-2xl text-center md:pb-4 md:text-5xl title'>Pokedex</h1>
            <div className="flex items-end justify-center gap-x-4">
                <form onSubmit={handleSubmit} className="lg:w-[600px] w-full flex flex-row">
                    <Button className="rounded-none rounded-l-lg bg-[#365FAC]"><MagnifyingGlassIcon/></Button>
                    <Input className="w-full rounded-none rounded-r-lg focus-visible:ring-offset-0 focus-visible:ring-0" type="text" placeholder="Search pokemon ..." onChange={handleInputChange} value={searchQuery}/>
                </form>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <MixerHorizontalIcon />
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