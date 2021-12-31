import propTypes from 'prop-types';
import ingredientPropType from './ingredientPropType';

const recipePropType = propTypes.shape({
  _id: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  shortDescription: propTypes.string.isRequired,
  ingredients: propTypes.arrayOf(propTypes.string).isRequired,
  image: propTypes.string.isRequired,
});

export default recipePropType;
