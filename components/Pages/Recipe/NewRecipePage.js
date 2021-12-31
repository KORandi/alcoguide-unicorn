import { useForm } from 'react-hook-form';
import { useState } from 'react/cjs/react.development';
import { useRouter } from 'next/router';
import { addRecipeFormData } from '../../../utils/api/recipe';

function NewRecipePage() {
  const [previewImage, setPreviewImage] = useState(null);
  const { register, handleSubmit } = useForm();
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
    formData.append('ingredients', JSON.stringify(['apple']));
    formData.append('rates', JSON.stringify([1, 2, 3, 4, 5]));
    formData.append('description', description);
    formData.append('author', author);
    await addRecipeFormData(formData);
    // router.push('/search');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-5" autoComplete="off">
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
        <label htmlFor="short-description">Short Description</label>
        <input
          {...register('shortDescription', { required: true })}
          className="form-control"
          type="text"
          id="short-description"
        />
      </div>
      <div className="form-group pb-3">
        <label htmlFor="ingredients">Ingredients</label>
        <input {...register('ingredients')} className="form-control" type="text" id="ingredients" />
      </div>
      <div className="form-group pb-3">
        <label htmlFor="description">Description</label>
        <textarea
          {...register('description', { required: true })}
          rows={5}
          className="form-control"
          id="description"
        />
      </div>
      <div className="form-group pb-3">
        <label htmlFor="author">Author</label>
        <input {...register('author')} className="form-control" type="text" id="author" />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}

export default NewRecipePage;
