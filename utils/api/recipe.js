import fetch from 'cross-fetch';

const host = process.env.HOST || '';

export async function getAllRecipes() {
  const res = await fetch(`${host}/api/recipe`);
  const { data } = await res.json();
  return data;
}

export async function searchRecipe(query) {
  const res = await fetch(`${host}/api/recipe?${new URLSearchParams(query).toString()}`);
  const { data } = await res.json();
  return data;
}

export async function getRecipe(id) {
  const res = await fetch(`${host}/api/recipe/${id}`);
  const { data } = await res.json();
  return data;
}

export async function deleteRecipe(id) {
  return fetch(`${host}/api/recipe/${id}`, {
    method: 'DELETE',
  });
}

export async function addRecipe(recipe) {
  const res = await fetch(`${host}/api/recipe`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipe),
  });
  return res;
}

export async function addRecipeFormData(recipe) {
  const res = await fetch(`${host}/api/recipe`, {
    method: 'POST',
    body: recipe,
  });
  return res;
}

export async function editRecipeFormData(id, recipe) {
  const res = await fetch(`${host}/api/recipe/${id}`, {
    method: 'PUT',
    body: recipe,
  });
  return res;
}

export async function removeImage(id) {
  const res = await fetch(`${host}/api/recipe/image/${id}`, {
    method: 'DELETE',
  });
  return res;
}

export async function rateRecipe(id, value) {
  const res = await fetch(`${host}/api/recipe/rate/${id}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ value }),
  });
  return res;
}
