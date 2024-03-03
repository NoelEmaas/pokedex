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
        <div className="w-full topbar sm:border-0 border-b pt-[30px] pb-[20px] flex flex-col justify-between gap-y-7">
            <h1 className='text-2xl text-center md:pb-4 md:text-5xl title'>Pokedex</h1>
            <div className="flex items-end justify-end gap-x-4">
                <form onSubmit={handleSubmit} className="lg:w-[600px] w-full flex flex-row border-[#373A41] border rounded-lg">
                    <Button className="rounded-none rounded-l-lg bg-[#5800CC] py-6 border-[#050911]"><MagnifyingGlassIcon/></Button>
                    <Input className="w-full rounded-none rounded-r-lg focus-visible:ring-offset-0 focus-visible:ring-0 border-0 bg-[#050911] py-6 text-white" type="text" placeholder="Search pokemon ..." onChange={handleInputChange} value={searchQuery}/>
                </form>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="border-[#373A41] hover:bg-[#0a111d] border px-5 py-6 focus-visible:ring-offset-0 focus-visible:ring-0 bg-[#050911]">
                            <MixerHorizontalIcon className="text-white"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-[#050911] text-white border-[#373A41]">
                        <DropdownMenuLabel>Order by:</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-[#373A41]"/>
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