import { UUID } from 'crypto';

export interface ItemModel {
  id: UUID;
  title: string;
  description: string;
  category: string;
  photo: string;
  price: number;
  favorite?: boolean;
  cart?: boolean;
  quantity?: number;
}
