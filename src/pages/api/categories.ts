import type { NextApiRequest, NextApiResponse } from 'next';
import { Categories, Category } from '@/mocks/categories';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Category[]>,
) {
  res.status(200).json(Categories);
}
