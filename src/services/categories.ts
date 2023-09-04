import instance from 'common/config/api';

const categoriesService = {
  get: async () => {
    const response = await instance.get('/categories');

    return response.data;
  },
};

export default categoriesService;
