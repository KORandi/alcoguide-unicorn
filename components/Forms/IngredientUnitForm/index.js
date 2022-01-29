import propTypes from 'prop-types';
import { PERSON_LIST } from '../../../utils/constants';

function IngredientUnitForm({ defaultValue, onChange }) {
  return (
    <div className="row my-2 d-flex align-items-center">
      <div className="col-6">
        <label htmlFor="ingredients-count">For:</label>
      </div>
      <div className="col-6">
        <select
          id="ingredients-count"
          defaultValue={defaultValue}
          onChange={onChange}
          className="form-select"
        >
          {PERSON_LIST.map(({ label, value }) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

IngredientUnitForm.propTypes = {
  defaultValue: propTypes.number,
  onChange: propTypes.func,
};

IngredientUnitForm.defaultProps = {
  defaultValue: 1,
  onChange: () => {},
};

export default IngredientUnitForm;
