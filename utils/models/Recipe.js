import mongoose from 'mongoose';

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
  ingredients: [
    {
      name: { type: String, required: true, unique: true, sparse: true },
      amount: { type: String },
      unit: { type: String },
    },
  ],
  rates: [Number],
  author: {
    type: String,
    required: true,
  },
  createdBy: { type: String },
});

export default mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);
