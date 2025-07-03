import { ProductDetails } from "./product-details";

export interface CartProduct {
  count: number;
  _id: string;
  product: ProductDetails;
  price: number;
}
