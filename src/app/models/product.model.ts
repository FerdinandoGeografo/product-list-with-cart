import { Image } from './image.model';

export type Product = {
  image: Image;
  name: string;
  category: string;
  price: number;
};
