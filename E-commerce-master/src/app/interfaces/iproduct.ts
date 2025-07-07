import { IBrand } from "./ibrand";
import { ICategory } from "./ictegory";
import { Ispecifications } from "./ispecifications";
import { ISubCategory } from "./isub-category";

export interface IProduct {
    _id: string;
    name:string
    title: string;
    description: string;
   quantity: number;
    sold: number;
   price: number;
   priceAfterDiscount: number;
   images: string[];
  imageCover: string;
  category: ICategory;
  subcategory: ISubCategory;
   brand: IBrand;
  ratingsAverage: number;
  ratingsQuantity: number;
  isInWishlist?: boolean;
  specifications:Ispecifications

  image:string
}
