import instance from 'common/config/api';

import { CategoryModel } from 'interfaces/categories';

const categoriesService = {
  get: async (): Promise<CategoryModel> => {
    const response = await instance.get('/categories');

    return response.data;
  },
  getCategory: async (categoryName: string): Promise<CategoryModel> => {
    const response = await instance.get(`/categories/${categoryName}`);

    return response.data;
  },
};

export default categoriesService;
