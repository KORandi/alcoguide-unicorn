import { Rating } from 'semantic-ui-react';

function EditRecipe() {
  return (
    <>
      <section style={{ backgroundColor: '#f0f0f0' }}>
        <div className="col-12">
          <div className="container">
            <div className="row py-3">
              <div className="col-md-4">
                <img
                  src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mojito-cocktails-150961e.jpg?quality=90&webp=true&resize=375,341"
                  alt="mochito"
                  className="w-100"
                />
              </div>
              <div className="col-md-8">
                <h1 className="h2">Mojito</h1>
                <div className="author">
                  <span>By: Good Food team</span>
                </div>
                <div className="rating">
                  <Rating icon="star" defaultRating={3} maxRating={5} /> 22 ratings
                </div>
                <div className="short-description">
                  Mix this classic cocktail for a party using fresh mint, white rum, sugar, zesty
                  lime and cooling soda water. Play with the quantities to suit your taste.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container my-3">
        <div className="row">
          <div className="col-md-4">
            <h3>Ingredients</h3>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Lime: 1 piece</li>
              <li className="list-group-item">Sugar: 1 tsp</li>
              <li className="list-group-item">Mint: 3 leaves</li>
              <li className="list-group-item">Rum: 60ml</li>
              <li className="list-group-item">Soda</li>
            </ul>
          </div>
          <div className="col-md-8">
            <h3>Method</h3>
            <h4>STEP 1</h4>
            <p>
              Muddle the lime juice, sugar and mint leaves in a small jug, crushing the mint as you
              go – you can use the end of a rolling pin for this. Pour into a tall glass and add a
              handful of ice.
            </p>
            <h4>STEP 2</h4>
            <p>
              Pour over the rum, stirring with a long-handled spoon. Top up with soda water, garnish
              with mint and serve.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// EditNote.getInitialProps = async ({ query: { id } }) => {
//   const res = await fetch(`http://localhost:3000/api/notes/${id}`);
//   const { data } = await res.json();

//   return { note: data };
// };

export default EditRecipe;
