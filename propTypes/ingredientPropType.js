import propTypes from 'prop-types';

const ingredientPropType = propTypes.shape({
  _id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
});

export default ingredientPropType;
