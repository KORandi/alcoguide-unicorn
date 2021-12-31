import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import propTypes from 'prop-types';
import SearchInput from './SearchInput';

function SearchForm({ ingredients }) {
  const router = useRouter();
  const { control, handleSubmit } = useForm();

  const onSubmit = ({ search = [] }) => {
    if (search.length === 0) {
      return;
    }
    router.push(
      `/search?${new URLSearchParams({
        ingredients: Object.values(search).map((ingredient) => ingredient._id),
      }).toString()}`
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="search d-block w-100" autoComplete="off">
      <div className="form-group">
        <Controller
          control={control}
          name="search"
          defaultValue={[]}
          render={({ field, fieldState }) => (
            <SearchInput data={ingredients} {...field} {...fieldState} />
          )}
        />
      </div>

      <div className="d-flex mt-3 justify-content-end">
        <button className="btn btn-primary px-3 mx-1 d-block w-100" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}

SearchForm.propTypes = {
  ingredients: propTypes.arrayOf(
    propTypes.shape({
      _id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
    })
  ).isRequired,
};

export default SearchForm;
