import mongoose from 'mongoose';

export const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, sparse: true },
});

export default mongoose.models.Ingredient || mongoose.model('Ingredient', IngredientSchema);
