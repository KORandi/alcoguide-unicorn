import SearchForm from '../../components/Forms/Search';

function SearchPage({ notes }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <SearchForm />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
