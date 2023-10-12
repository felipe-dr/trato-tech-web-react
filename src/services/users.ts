import instance from 'common/config/api';

const usersService = {
  getById: async (id: number) => {
    const response = await instance.get(`/users/${id}`);

    return response.data;
  },
};

export default usersService;
