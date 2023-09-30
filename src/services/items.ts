import instance from 'common/config/api';

const itemsService = {
  get: async () => {
    const response = await instance.get('/items');

    return response.data;
  },
  getFromCategories: async (categoryName: string) => {
    const response = await instance.get(`/items?category=${categoryName}`);

    return response.data;
  },
};

export default itemsService;
