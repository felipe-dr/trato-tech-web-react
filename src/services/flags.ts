import instance from 'common/config/api';

import { FlagModel } from 'interfaces/flag';

const flagsService = {
  getById: async (flags: number[]): Promise<FlagModel[]> => {
    const query = new URLSearchParams();
    flags.forEach((id: number) => query.append('id', id.toString()));
    const response = await instance.get(`/flags?${query.toString()}`);

    return response.data;
  },
};

export default flagsService;
