type ProductImageType = {
  url: string;
  public_id: string;
};

export type ProductType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: ProductImageType[];
  categories: string[];
  subCategories: string[];
  countInStock: number;
  ownderId: string;
  createdAT: Date;
  updatedAT: Date;
};
