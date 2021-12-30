import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react/cjs/react.development';
import { useEffect } from 'react';
import classNames from 'classnames';
import SearchInput from './SearchInput';
import fruits from '../../../assets/fruits.json';

function SearchForm() {
  const { control, handleSubmit } = useForm();
  const [headline, setHeadline] = useState('');
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const quote =
    'Our goal is to help users set up the best alcoholic drinks from the in house ingrediences';

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

  const typeWriter = () => {
    if (headline.length < quote.length) {
      setTimeout(() => {
        setHeadline(headline + quote.charAt(headline.length));
      }, 25);
    } else {
      setTimeout(() => {
        setShowForm(true);
      }, 1000);
    }
  };

  useEffect(() => {
    typeWriter();
  }, [headline]);

  return (
    <div className="d-flex h-100 align-items-center justify-content-center">
      <div
        className={classNames({
          'w-100': !showForm,
        })}
      >
        <div
          className={classNames('w-100', {
            'd-none': showForm,
            'animate__animated animate__fadeOut': showForm,
          })}
        >
          <figure className="text-start text-light fw-bold d-block w-100">
            <blockquote className="blockquote">
              <p style={{ minHeight: '50px' }}>
                <i>{headline}</i>
              </p>
            </blockquote>
            <figcaption className="blockquote-footer text-light fw-bold">Our team</figcaption>
          </figure>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classNames('search d-block w-100', {
            'd-none': !showForm,
            'animate__animated animate__fadeIn': showForm,
          })}
          autoComplete="off"
        >
          <h2 className="text-center text-white">What ingredients do you have?</h2>
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
      <style jsx global>
        {`
          body {
            /* The image used */
            background-image: url('/img/bg.jpg');

            /* Full height */
            height: 100%;

            /* Center and scale the image nicely */
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }
        `}
      </style>
    </div>
  );
}

export default SearchForm;
