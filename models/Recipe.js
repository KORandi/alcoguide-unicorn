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
    maxlength: [40, 'Title cannot be more than 40 characters'],
  },
  shortDescription: {
    type: String,
  },
  description: {
    type: String,
    required: true,
    maxlength: [200, 'Description cannot be more than 200 characters'],
  },
  ingredients: [String],
  rates: [Number],
  author: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);
