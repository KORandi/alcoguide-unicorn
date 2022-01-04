import propTypes from 'prop-types';
import ingredientPropType from './ingredientPropType';

const recipePropType = propTypes.shape({
  _id: propTypes.string,
  title: propTypes.string,
  description: propTypes.string,
  shortDescription: propTypes.string,
  ingredients: propTypes.arrayOf(ingredientPropType),
  image: propTypes.string,
});

export default recipePropType;
