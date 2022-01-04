import mongoose from 'mongoose';
import { IngredientSchema } from './Ingredient';

const RecipeSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    unique: true,
  },
  shortDescription: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: [IngredientSchema],
  rates: [Number],
  author: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);
