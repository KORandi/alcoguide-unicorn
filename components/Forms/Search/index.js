import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import SearchInput from './SearchInput';
import fruits from '../../../assets/fruits.json';

function SearchForm() {
  const { control, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = ({ search = [] }) => {
    if (search.length === 0) {
      return;
    }
    router.push(
      `/search?${new URLSearchParams({
        ingredients: Object.values(search).map((ingredient) => ingredient.id),
      }).toString()}`
    );
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '80vh' }}>
      <div>
        <div>
          <div>
            <figure className="text-center">
              <blockquote className="blockquote">
                <p>A well-known quote, contained in a blockquote element.</p>
              </blockquote>
              <figcaption className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </figure>
          </div>
        </div>
        <h2 className="text-center">What ingredients do you have?</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="search d-block w-100" autoComplete="off">
          <div className="form-group">
            <Controller
              control={control}
              name="search"
              defaultValue={[]}
              render={({ field, fieldState }) => (
                <SearchInput data={fruits} {...field} {...fieldState} />
              )}
            />
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
