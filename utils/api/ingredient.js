import fetch from 'cross-fetch';

const host = process.env.HOST || '';

export async function getAllIngredients() {
  const res = await fetch(`${host}/api/ingredient`);
  const { data } = await res.json();
  return data;
}

export async function searchIngredient(query) {
  const res = await fetch(`${host}/api/ingredient?${new URLSearchParams(query).toString()}`);
  const { data } = await res.json();
  return data;
}

export async function getIngredient(id) {
  const res = await fetch(`${host}/api/ingredient/${id}`);
  const { data } = await res.json();
  return data;
}

export async function deleteIngredient(id) {
  return fetch(`${host}/api/ingredient/${id}`, {
    method: 'DELETE',
  });
}

export async function addIngredient(recipe) {
  const res = await fetch(`${host}/api/ingredient`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipe),
  });
  return res;
}
