import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { addRecipeFormData } from '../../../utils/api/recipe';
import RichtextEditor from '../../RichtextEditor';

function NewRecipePage() {
  const [previewImage, setPreviewImage] = useState(null);
  const { register, handleSubmit, control } = useForm();
  const router = useRouter();

  const setPreview = (event) => {
    const [file] = event.target.files;
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

  const onSubmit = async ({ image, title, shortDescription, ingredients, description, author }) => {
    const formData = new FormData();
    formData.append('image', image[0]);
    formData.append('title', title);
    formData.append('shortDescription', shortDescription);
    formData.append(
      'ingredients',
      JSON.stringify([{ _id: '61ce5d5b8e7470db675128fe', name: 'apple' }])
    );
    formData.append('rates', JSON.stringify([1, 2, 3, 4, 5]));
    formData.append('description', description);
    formData.append('author', author);
    await addRecipeFormData(formData);
    router.push('/search');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-5" autoComplete="off">
      <div className="row">
        <div className="col-md-4 d-flex flex-column justify-content-start">
          {previewImage && (
            <div>
              <span>Preview image</span>
              <br />
              <img src={previewImage} style={{ maxHeight: '150px' }} alt="Preview" />
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
        <label htmlFor="description">Method</label>
        <Controller
          name="description"
          defaultValue=""
          control={control}
          render={({ field: { onChange, onBlur, ref } }) => (
            <RichtextEditor ref={ref} onChange={onChange} onBlur={onBlur} />
          )}
        />
      </div>
      <div className="form-group-pb-3">
        <button className="btn btn-primary d-block ms-auto" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

export default NewRecipePage;
