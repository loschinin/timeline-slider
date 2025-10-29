import type { NextApiRequest, NextApiResponse } from 'next';
import { Categories, Category } from '@/mocks/categories';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Category | { message: string }>,
) {
  const { id } = req.query;
  const category = Categories.find((cat) => cat.id === parseInt(id as string));

  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
}
