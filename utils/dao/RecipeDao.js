export default class RecipeDao {
  constructor({
    image,
    title,
    shortDescription,
    description,
    ingredients,
    rates,
    author,
    createdBy,
  }) {
    this.image = image;
    this.title = title;
    this.shortDescription = shortDescription;
    this.description = description;
    this.ingredients = ingredients;
    this.rates = rates;
    this.author = author;
    this.createdBy = createdBy;
  }
}
