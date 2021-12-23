import { useForm } from 'react-hook-form';
import SearchInput from './SearchInput';

function SearchForm() {
  const { register } = useForm();

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '80vh' }}>
      <div>
        <h2 className="text-center">What ingredients do you have?</h2>
        <form className="search d-block w-100">
          <div className="form-group">
            <SearchInput {...register('search')} />
          </div>

          <div className="d-flex mt-3 justify-content-end">
            <button className="btn btn-primary px-3 mx-1 d-block w-100" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchForm;
