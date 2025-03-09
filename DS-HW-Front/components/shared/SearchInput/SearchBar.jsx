import React, { useState } from "react";

export const SearchBar = ({ setSearch, search }) => {


    const handleChange = (value) => {
        setSearch(value);
    };

    return (
        <div className="input-wrapper">
            <i id="bi bi-search" />
            <input ype="text" placeholder="Busca un empleado..." value={search} onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
};