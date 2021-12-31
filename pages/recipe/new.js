import NewRecipePage from '../../components/Pages/Recipe/NewRecipePage';

function NewRecipe() {
  return (
    <div className="container" style={{ height: 'calc(100% - 50px)' }}>
      <div className="row h-100">
        <div className="col-12 h-100">
          <NewRecipePage />
        </div>
      </div>
    </div>
  );
}

export default NewRecipe;
