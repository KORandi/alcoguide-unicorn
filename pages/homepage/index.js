import propTypes from 'prop-types';
import HomePage from '../../components/Pages/HomePage';
import { getAllIngredients } from '../../utils/api/ingredient';

function Homepage({ ingredients }) {
  return (
    <div className="container" style={{ height: 'calc(100% - 50px)' }}>
      <div className="row h-100">
        <div className="col-12 h-100">
          <HomePage ingredients={ingredients} />
        </div>
      </div>
    </div>
  );
}

Homepage.propTypes = {
  ingredients: propTypes.arrayOf(
    propTypes.shape({
      _id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
    })
  ).isRequired,
};

Homepage.getInitialProps = async () => {
  const ingredients = await getAllIngredients();
  return { ingredients };
};

export default Homepage;
