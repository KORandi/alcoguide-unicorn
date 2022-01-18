import React, { useState, useEffect } from 'react';
import { Icon, Label } from 'semantic-ui-react';
import SearchInput from './SearchInput';

const SearchInputTable = React.forwardRef(
  ({ data, fieldState, value: defaultValue, onChange }, ref) => {
    const [value, setValue] = useState([]);

    useEffect(() => {
      setValue(defaultValue);
    }, [defaultValue]);

    const removeFromSearch = (element) => {
      const newValue = value.filter((el) => el !== element);
      setValue(newValue);
      onChange(newValue);
    };

    const handleOnChangeSearchInput = (val) => {
      const newValue = val.map((el) => ({ ...el, amount: el.amount ? el.amount : '' }));
      setValue(newValue);
      onChange(newValue);
    };

    const handleOnChangeAmountInput = (event, element) => {
      const amount = event.target.value;
      const modifiedElement = value.find(({ _id }) => _id === element._id);
      modifiedElement.amount = amount;
      setValue([...value]);
      onChange([...value]);
    };

    return (
      <div className="row py-3">
        <div className="col-md-6">
          <label htmlFor="ingredients">Ingredients</label>
          <div>
            <SearchInput
              hiddenLabels
              data={data}
              value={value}
              onChange={handleOnChangeSearchInput}
              ref={ref}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="row fw-bold">
            <div className="col-3">Name</div>
            <div className="col-9">Amount</div>
          </div>
          {value &&
            value.map((el) => (
              <div key={el._id} className="row my-1">
                <div className="col-3 my-1">
                  <Label key={el._id}>
                    {el.name}
                    <Icon
                      name="delete"
                      onClick={() => {
                        removeFromSearch(el);
                      }}
                    />
                  </Label>
                </div>
                <div className="col-9 my-1">
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={el.amount}
                    onChange={(event) => handleOnChangeAmountInput(event, el)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
);

export default SearchInputTable;
