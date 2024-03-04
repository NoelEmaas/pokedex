import SortTool from "@/pages/Home/components/SortTool";
import SearchBar from "@/pages/Home/components/SearchBar";

const SearchSortPanel = ({ setSearchQuery, sortBy, setSortBy }) => {
    return (
        <div className="flex flex-row items-center justify-center w-full pb-5 border-b md:border-0 gap-x-4 border-[#373A41]">
            <SearchBar setSearchQuery={setSearchQuery} />
            <SortTool sortBy={sortBy} setSortBy={setSortBy} />
        </div>
    )
}

export default SearchSortPanel;