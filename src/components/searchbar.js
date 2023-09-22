import { useState } from "react"

function SearchBar({searchTerm, setSearchTerm}) {

    const [search, setSearch] = useState(searchTerm);
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    function debounce( event,debounceTimeout){
        const value = event.target.value;
        if (debounceTimeout) {
          clearTimeout(debounceTimeout);
        }
        const timeout = setTimeout(() => {
          setSearchTerm(value);
        }, 400);
        setDebounceTimeout(timeout);
    }

    return (
        <div className="relative flex-1 mb-4">
            <label htmlFor="Search" className="sr-only">Search</label>
            <input
                type="text"
                id="Search"
                placeholder="Search by name, email or role"
                value={search}
                onChange={(e)=>{setSearch(e.target.value); debounce(e,debounceTimeout)}}
                className="w-full border-gray-200 border
                py-2 border-box pe-10 ps-2 text-sm"
            />
        </div>
    )
}

export default SearchBar