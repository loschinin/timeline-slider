import { Category } from '@/mocks/categories';

export const fetchCategories = async (): Promise<Category[]> => {
  const res = await fetch('/api/categories');
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};
