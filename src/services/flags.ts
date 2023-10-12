import instance from 'common/config/api';

import { FlagsModel } from 'interfaces/flags';

const flagsService = {
  getById: async (flags: FlagsModel[]) => {
    const query = new URLSearchParams();
    flags.forEach((flag) => query.append('id', flag.id.toString()));
    const response = await instance.get(`/flags?${query.toString()}`);

    return response.data;
  },
};

export default flagsService;
