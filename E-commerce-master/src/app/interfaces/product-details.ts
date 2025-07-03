import { Brand } from "./brand";
import { Category } from "./category";
import { Subcategory } from "./subcategory";

export interface ProductDetails {
  subcategory: Subcategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}
