import propTypes from 'prop-types';

const ingredientPropType = propTypes.shape({
  id: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
});

export default ingredientPropType;
