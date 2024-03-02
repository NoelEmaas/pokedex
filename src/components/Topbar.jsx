import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const Topbar = ({ searchInput, setSearchInput }) => {

    const handleInputChange = (event) => {
      const value = event.target.value;
      setSearchInput(value);
    };

    return (
        <div className="w-full border-b topbar pt-[30px] pb-[20px] flex flex-row justify-between">
            <div>
                <h1 className='pb-4 text-6xl title'>Pokedex</h1>
                <p>A database of Pokémon information at your fingertips.</p>
            </div>
            <div className="flex flex-row items-end">
                <Input type="text" placeholder="Search pokemon" onChange={handleInputChange} value={searchInput}/>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Sort by</SelectLabel>
                            <SelectItem value="apple">Name ↑</SelectItem>
                            <SelectItem value="banana">Name ↓</SelectItem>
                            <SelectItem value="blueberry">ID number ↑</SelectItem>
                            <SelectItem value="grapes">ID number ↓</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default Topbar