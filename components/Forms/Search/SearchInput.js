import classNames from 'classnames';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ingredientPropType from '../../../utils/propTypes/ingredientPropType';

const SearchInput = React.forwardRef(
  ({ onChange, onKeyDown, value: defaultValue, data, hiddenLabels }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const [showSearchResult, setShowSearchResult] = useState(false);
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
      setValue(defaultValue);
    }, [defaultValue]);

    const addToSearch = (element) => {
      setShowSearchResult(false);
      const newValue = [...value, element];
      setValue(newValue);
      onChange(newValue);
      setInputValue('');
      document.activeElement.blur();
    };

    const removeFromSearch = (element) => {
      const newValue = value.filter((el) => el !== element);
      setValue(newValue);
      onChange(newValue);
    };

    useImperativeHandle(ref, () => ({
      clearInput() {
        setInputValue('');
      },
    }));

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
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setInputValue('');
              }
              onKeyDown(event);
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
        {!hiddenLabels && (
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
        )}
      </div>
    );
  }
);

SearchInput.propTypes = {
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  value: PropTypes.arrayOf(ingredientPropType),
  data: PropTypes.arrayOf(ingredientPropType),
  hiddenLabels: PropTypes.bool,
};

SearchInput.defaultProps = {
  onChange: () => {},
  onKeyDown: () => {},
  value: [],
  data: [],
  hiddenLabels: false,
};

export default SearchInput;
