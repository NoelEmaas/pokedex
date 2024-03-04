import { useState, useEffect } from 'react';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

const SearchBar = ({ setSearchQuery }) => {
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        setSearchInput(localStorage.getItem("searchValue") || '');
    }, []);

    const handleInputChange = (event) => {
        const value = event.target.value;
        localStorage.setItem("searchValue", value);
        if (value === '') setSearchQuery(value);
        setSearchInput(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchQuery(searchInput);
    }

    return (
        <form onSubmit={handleSubmit} className="lg:w-[600px] w-full flex flex-row border-[#373A41] border rounded-lg">
            <Button className="rounded-none rounded-l-lg bg-[#5800CC] py-6 border-[#050911]">
                <MagnifyingGlassIcon/>
            </Button>
            <Input 
                className="w-full rounded-none rounded-r-lg focus-visible:ring-offset-0 focus-visible:ring-0 border-0 bg-[#050911] py-6 text-white" 
                type="text" 
                placeholder="Search pokemon ..." 
                onChange={handleInputChange} 
                value={searchInput}
            />
        </form>
    );
};

export default SearchBar;

