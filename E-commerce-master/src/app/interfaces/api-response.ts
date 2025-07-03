import { CartData } from "./cart-data";

export interface ApiResponse {
  status: string;
  message?: string;
  numOfCartItems: number;
  data: CartData;
}
