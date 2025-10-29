import { Category } from '@/mocks/categories';

export const getCategoryById = async (
  id: number,
): Promise<Category | undefined> => {
  const res = await fetch(`/api/categories/${id}`);
  if (!res.ok) return undefined;
  return res.json();
};
