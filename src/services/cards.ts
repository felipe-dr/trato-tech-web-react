import instance from 'common/config/api';

import { CardModel } from 'interfaces/card';

const cardsService = {
  getByIdUser: async (id: number): Promise<CardModel[]> => {
    const response = await instance.get(`/cards/?userId=${id}`);

    return response.data;
  },
};

export default cardsService;
