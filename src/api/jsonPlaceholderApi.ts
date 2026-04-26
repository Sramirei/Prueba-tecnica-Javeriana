const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface JsonPlaceholderPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isJsonPlaceholderPost = (value: unknown): value is JsonPlaceholderPost => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.userId === 'number' &&
    typeof value.id === 'number' &&
    typeof value.title === 'string' &&
    typeof value.body === 'string'
  );
};

const parsePosts = (payload: unknown): JsonPlaceholderPost[] => {
  if (!Array.isArray(payload)) {
    throw new Error('La respuesta de JSONPlaceholder no tiene el formato esperado.');
  }

  const posts = payload.filter(isJsonPlaceholderPost);

  if (posts.length !== payload.length) {
    throw new Error('Uno o más programas recibidos no tienen un formato válido.');
  }

  return posts;
};

export const getPosts = async (limit = 12): Promise<JsonPlaceholderPost[]> => {
  const response = await fetch(`${API_BASE_URL}/posts?_limit=${limit}`);

  if (!response.ok) {
    throw new Error('No fue posible obtener datos desde JSONPlaceholder.');
  }

  const payload: unknown = await response.json();

  return parsePosts(payload);
};
