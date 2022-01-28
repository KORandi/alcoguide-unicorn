import React, { useState, useEffect } from 'react';
import { Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { addIngredient } from '../../../utils/api/ingredient';
import { useAppContext } from '../../../utils/context/state';
import SearchInput from './SearchInput';
import ingredientPropType from '../../../utils/propTypes/ingredientPropType';

const SearchInputTable = React.forwardRef(({ data, value: defaultValue, onChange }, ref) => {
  const [value, setValue] = useState([]);
  const { fetchIngredients } = useAppContext();

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const removeFromSearch = (element) => {
    const newValue = value.filter((el) => el !== element);
    setValue(newValue);
    onChange(newValue);
  };

  const handleOnChangeSearchInput = (val) => {
    const newValue = val.map((el) => ({
      ...el,
      amount: el.amount ? el.amount : '',
      unit: el.unit ? el.unit : '',
    }));
    setValue(newValue);
    onChange(newValue);
  };

  const handleOnChangeInput = (event, element, key) => {
    const amount = event.target.value;
    const modifiedElement = value.find(({ _id }) => _id === element._id);
    modifiedElement[key] = amount;
    setValue([...value]);
    onChange([...value]);
  };

  const onEnterPress = async (event) => {
    event.preventDefault();
    const newValue = event.target.value;
    if (newValue) {
      const { data: resultData } = await addIngredient({ name: newValue });
      await fetchIngredients();
      setValue([
        ...value,
        {
          name: resultData.name,
          _id: resultData._id,
        },
      ]);
    }
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
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                onEnterPress(event);
              }
            }}
            ref={ref}
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="row fw-bold">
          <div className="col-4">Name</div>
          <div className="col-4">Amount</div>
          <div className="col-4">Unit</div>
        </div>
        {value &&
          value.map((el) => (
            <div key={el._id} className="row my-1">
              <div className="col-4 my-1">
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
              <div className="col-4 my-1">
                <input
                  className="form-control"
                  type="text"
                  defaultValue={el.amount}
                  onChange={(event) => handleOnChangeInput(event, el, 'amount')}
                />
              </div>
              <div className="col-4 my-1">
                <input
                  className="form-control"
                  type="text"
                  defaultValue={el.unit}
                  onChange={(event) => handleOnChangeInput(event, el, 'unit')}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
});

SearchInputTable.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.arrayOf(ingredientPropType),
  data: PropTypes.arrayOf(ingredientPropType),
};

SearchInputTable.defaultProps = {
  onChange: () => {},
  value: [],
  data: [],
};

export default SearchInputTable;
