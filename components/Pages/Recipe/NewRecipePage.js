import { Controller } from 'react-hook-form';
import { useEffect } from 'react';
import RichtextEditor from '../../RichtextEditor';
import { useRecipeActions } from '../../../utils/utils';
import { removeImage } from '../../../utils/api/recipe';
import SearchInputTable from '../../Forms/Search/SearchInputTable';
import recipePropType from '../../../utils/propTypes/recipePropType';

function NewRecipePage({ recipe }) {
  const {
    router,
    ingredients,
    control,
    previewImage,
    setPreviewImage,
    pourForm,
    handleSubmit,
    register,
  } = useRecipeActions();

  const setPreview = (event) => {
    const [file] = event.target.files;
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

  useEffect(() => {
    if (!recipe) {
      return;
    }
    pourForm(recipe);
  }, [recipe]);

  return (
    <>
      <div className="row pt-5">
        <div className="col-12 d-flex justify-content-end">
          <div>
            <button onClick={() => router.back()} className="btn btn-primary" type="button">
              Go back <i className="bi bi-arrow-return-left" />
            </button>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="py-3" autoComplete="off">
        <div className="row">
          <div className="col-md-4 d-flex flex-column justify-content-start">
            {previewImage && (
              <div>
                <span>Preview image</span>
                <br />
                <img src={previewImage} style={{ maxHeight: '150px' }} alt="Preview" />
                {previewImage && recipe && (
                  <>
                    <br />
                    <button
                      onClick={async () => {
                        await removeImage(recipe._id);
                        setPreviewImage('');
                      }}
                      className="btn btn-danger my-2"
                      type="button"
                    >
                      Remove image <i className="bi bi-file-earmark-x-fill" />
                    </button>
                  </>
                )}
              </div>
            )}
            <div className="form-group pb-3">
              <label htmlFor="image">Image</label>
              <input
                {...register('image')}
                onChange={setPreview}
                className="form-control"
                type="file"
                id="image"
                accept="image/png, image/gif, image/jpeg"
              />
            </div>
          </div>
          <div className="col-md-8 d-flex flex-column justify-content-start">
            <div className="form-group pb-3">
              <label htmlFor="title">Title</label>
              <input
                {...register('title', { required: true })}
                className="form-control"
                type="text"
                id="title"
              />
            </div>
            <div className="form-group pb-3">
              <label htmlFor="author">Author</label>
              <input {...register('author')} className="form-control" type="text" id="author" />
            </div>
          </div>
        </div>
        <div className="form-group pb-3">
          <label htmlFor="short-description">Short Description</label>
          <textarea
            {...register('shortDescription', { required: true })}
            rows={2}
            className="form-control"
            type="text"
            id="short-description"
          />
        </div>
        <div className="form-group pb-3">
          <Controller
            control={control}
            name="ingredients"
            defaultValue={[]}
            render={({ field, fieldState }) => (
              <SearchInputTable data={ingredients} {...field} {...fieldState} />
            )}
          />
        </div>
        <div className="form-group pb-3">
          <label htmlFor="description">Method</label>
          <Controller
            name="description"
            defaultValue=""
            control={control}
            render={({ field: { value, onChange, onBlur, ref } }) => (
              <RichtextEditor value={value} ref={ref} onChange={onChange} onBlur={onBlur} />
            )}
          />
        </div>
        <input {...register('_id')} type="hidden" />
        <div className="form-group-pb-3">
          <button className="btn btn-primary d-block ms-auto" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

NewRecipePage.propTypes = {
  recipe: recipePropType.isRequired,
};

export default NewRecipePage;
