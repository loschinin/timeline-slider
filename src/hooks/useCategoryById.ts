import { useQuery } from '@tanstack/react-query';
import { getCategoryById } from '@/services/categories';

export const useCategoryById = (id: number) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => getCategoryById(id),
    enabled: !!id, 
  });
};
