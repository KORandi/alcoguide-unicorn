/* eslint-disable react/no-danger */
import { Rating } from 'semantic-ui-react';
import recipePropType from '../../../propTypes/recipePropType';
import { getRecipe } from '../../../utils/api/recipe';

function EditRecipe({
  recipe: { title, author, rates, shortDescription, ingredients, image, description },
}) {
  return (
    <>
      <section style={{ backgroundColor: '#f0f0f0' }}>
        <div className="col-12">
          <div className="container">
            <div className="row py-3">
              <div className="col-md-4">
                <img src={image} alt={title} className="w-100" />
              </div>
              <div className="col-md-8">
                <h1 className="h2">{title}</h1>
                <div className="author">
                  <span>{author}</span>
                </div>
                <div className="rating">
                  <Rating
                    icon="star"
                    defaultRating={rates.reduce((acc, rate) => acc + rate) / rates.length}
                    maxRating={5}
                  />{' '}
                  {rates.length} ratings
                </div>
                <div className="short-description">{shortDescription}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container my-3">
        <div className="row">
          <div className="col-md-4">
            {ingredients && (
              <>
                <h3>Ingredients</h3>
                <ul className="list-group list-group-flush">
                  {ingredients.map(({ name, amount }) => (
                    <li className="list-group-item">
                      {name}
                      {amount ? `: ${amount}` : ''}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="col-md-8">
            <h3>Method</h3>
            <p className="mt-3" dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
      </div>
    </>
  );
}

EditRecipe.propTypes = {
  recipe: recipePropType.isRequired,
};

EditRecipe.getInitialProps = async ({ query: { id } }) => {
  const recipe = await getRecipe(id);
  return { recipe };
};

export default EditRecipe;
