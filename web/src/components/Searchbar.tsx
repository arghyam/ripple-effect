import { ChangeEvent } from "react";

interface SearchbarProps { 
    query: string; 
    onSearch: () => void; 
    onQueryChange: (arg0: string) => void; 
    
}

const Searchbar: React.FC<SearchbarProps>  = ({query, onQueryChange, onSearch}) => {
    return (

        <form className="max-w-md mx-auto">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="search" id="default-search" value={query} onChange={(e: ChangeEvent<HTMLInputElement>) => onQueryChange(e.target.value)} className="block w-full p-4 ps-10 text-sm text-gray-900   rounded-lg bg-gray-50 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" placeholder="Search Recipes..." required />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-primary hover:green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 placeholder" onClick={onSearch}>Search</button>
            </div>
        </form>

    );
}

export default Searchbar