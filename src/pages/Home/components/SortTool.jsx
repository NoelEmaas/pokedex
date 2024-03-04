import { Button } from "@/components/ui/button"
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { 
    DropdownMenu,
    DropdownMenuContent, 
    DropdownMenuLabel, 
    DropdownMenuRadioGroup, 
    DropdownMenuRadioItem, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

const SortTool = ({ sortBy, setSortBy }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-[#373A41] hover:bg-[#0a111d] border px-5 py-6 focus-visible:ring-offset-0 focus-visible:ring-0 bg-[#050911]">
                    <MixerHorizontalIcon className="text-white"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#050911] text-white border-[#373A41]">
                <DropdownMenuLabel>Order by:</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#373A41]"/>
                <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                    <DropdownMenuRadioItem value="0">Id number (ascending)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="1">Id number (descending)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="2">Name (a - z)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="3">Name (z - a)</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SortTool;