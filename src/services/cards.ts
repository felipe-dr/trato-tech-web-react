import instance from 'common/config/api';

const cardsService = {
  getByIdUser: async (id: number) => {
    const response = await instance.get(`/cards/?userId=${id}`);

    return response.data;
  },
};

export default cardsService;
