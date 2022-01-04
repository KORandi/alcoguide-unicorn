import propTypes from 'prop-types';

const ingredientPropType = propTypes.shape({
  _id: propTypes.string,
  name: propTypes.string,
});

export default ingredientPropType;
