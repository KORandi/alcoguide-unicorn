import classNames from 'classnames';
import React, { useState } from 'react';
import { Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ingredientPropType from '../../../propTypes/ingredientPropType';

const SearchInput = React.forwardRef(({ onChange, value, data }, ref) => {
  const [inputValue, setInputValue] = useState('');
  const [showSearchResult, setShowSearchResult] = useState(false);

  const addToSearch = (element) => {
    setShowSearchResult(false);
    onChange([...value, element]);
    setInputValue('');
    document.activeElement.blur();
  };

  const removeFromSearch = (element) => {
    onChange(value.filter((el) => el !== element));
  };

  return (
    <div>
      <div className="autocomplete inner-addon left-addon">
        <i className="bi bi-search" />
        <input
          onBlur={() => {
            setShowSearchResult(false);
          }}
          onFocus={() => {
            setShowSearchResult(true);
          }}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          value={inputValue}
          ref={ref}
          className="form-control d-block w-100"
          type="text"
        />
        <div
          className={classNames('autocomplete-items', {
            invisible: !showSearchResult,
          })}
        >
          {data
            .filter((result) => result.name.startsWith(inputValue))
            .filter((result) => !value?.some((el) => el.name === result.name))
            .filter((result, index) => index < 5)
            .map((result) => (
              <div
                key={result.name}
                onKeyDown={() => {
                  addToSearch(result);
                }}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  addToSearch(result);
                }}
                role="link"
                tabIndex={0}
                className="autocomplete-item"
              >
                {result.name}
              </div>
            ))}
        </div>
      </div>
      <div className="selected px-1 pt-2" style={{ maxWidth: '300px' }}>
        {value.map((searchElement) => (
          <Label key={searchElement.name} className="mt-1">
            {searchElement.name}
            <Icon
              name="delete"
              onClick={() => {
                removeFromSearch(searchElement);
              }}
            />
          </Label>
        ))}
      </div>
    </div>
  );
});

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(ingredientPropType).isRequired,
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default SearchInput;
