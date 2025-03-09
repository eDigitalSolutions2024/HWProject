import { useState } from "react";

import { SearchBar } from "./SearchBar";
import SearchResultsList from "./SearchResultList";

function SearchInput({ results, setSearch, search, action }) {
    ;

    return (
        <div className="App">
            <div className="search-bar-container">
                <SearchBar search={search} setSearch={setSearch} />
                {results && results.length > 0 && <SearchResultsList results={results} action={action} setSearch={setSearch} />}
            </div>
        </div>
    );
}

export default SearchInput;