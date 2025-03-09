import React from 'react'
import Avatar from '../Avatar'
import { getUserImage } from '../../../api/users';

const SearchResultsList = ({ results, action, setSearch }) => {
    return (
        <div className='result-list-container w-100'>
            <div className="results-list">
                {results.map((result, id) => {
                    return (
                        <div className='d-flex align-items-center my-1' onClick={() => { action(result._id); setSearch('') }}>
                            <div className='ms-2'>
                                <Avatar alt={result._id} getImage={getUserImage} param={result?._id} status={result?.image ? true : false} width={'50px'} height={'50px'} />
                            </div>
                            <span className='ms-3'> {result.firstName} {result.lastName} </span>
                            <div className='ms-auto me-3'>
                                <span>{result?.role?.role}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    );
};

export default SearchResultsList