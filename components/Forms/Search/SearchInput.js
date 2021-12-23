import React, { useState } from 'react';
import data from '../../../assets/data.json';

const SearchInput = React.forwardRef((props, ref) => {
  const [searchResult, setSearchResult] = useState(data);
  return (
    <div className="autocomplete inner-addon left-addon">
      <i className="bi bi-search" />
      <input
        {...props}
        onBlur={() => {
          setSearchResult([]);
        }}
        onFocus={() => {
          setSearchResult(data);
        }}
        ref={ref}
        className="form-control d-block w-100"
        type="text"
      />
      <div className="autocomplete-items">
        {searchResult.map((result) => (
          <div key={result.name} className="autocomplete-item">
            {result.name}
          </div>
        ))}
      </div>
    </div>
  );
});

export default SearchInput;
