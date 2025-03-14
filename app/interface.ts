export interface simplifiedProduct {
  _id: string;
  imageUrl: string;
  price: number;
  slug: string;
  categoryName: string;
    name: string;
}

export interface fullProduct{
    _id: string;
    images: string[];
    price: number;
    name: string;
    slug: string;
    categoryName: string;
    description: string;
    price_id: string;
}