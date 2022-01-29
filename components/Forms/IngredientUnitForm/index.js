import propTypes from 'prop-types';
import { PERSON_LIST } from '../../../utils/constants';

function IngredientUnitForm({ defaultValue, onChange }) {
  return (
    <div className="row my-2">
      <div className="col-6">
        <span>For:</span>
      </div>
      <div className="col-6">
        <select defaultValue={defaultValue} onChange={onChange} className="form-select">
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
