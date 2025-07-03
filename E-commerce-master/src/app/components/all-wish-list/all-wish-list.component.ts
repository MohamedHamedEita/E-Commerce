import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/interfaces/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-all-wish-list',
  templateUrl: './all-wish-list.component.html',
  styleUrls: ['./all-wish-list.component.css'],
})
export class AllWishListComponent implements OnInit {
  allWishListProducts: IProduct[] = [];
  isLoading: boolean = false;
  constructor(
    private _WishlistService: WishlistService,
    private _CartService: CartService,
    private _toaster: ToastrService
  ) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.getAllWishListProducts();
  }
  getAllWishListProducts() {
    this._WishlistService.getAllWishList().subscribe({
      next: (res) => {
        console.log(res);
        this.allWishListProducts = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  addToCart(id: string) {
    this.isLoading = true;
    this._CartService.addCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this._CartService.cartItemsNum.next(res.numOfCartItems);
        this._toaster.success(res.message, 'Added', {
          closeButton: true,
          timeOut: 3000,
          easing: 'ease-in-out',
          progressBar: true,
          progressAnimation: 'increasing',
        });
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        // this.toastr.showError();
      },
    });
  }

  removeProductFromWishList(id: string) {
    this.isLoading = true;
    this._WishlistService.removeProductFromWishList(id).subscribe({
      next: (res) => {
        console.log(res);
        // this.allWishListProducts = this.allWishListProducts.filter(
        //   (product) => product._id!== id
        // );
        this.isLoading = false;
        this._WishlistService.wishListProductIds.next(res.data);
        this._WishlistService.wishListItemsCount.next(res.data.length)

        this._toaster.error(res.message, 'Remove', {
          closeButton: true,
          timeOut: 3000,
          easing: 'ease-in-out',
          progressBar: true,
          progressAnimation: 'increasing',
        });
        this.getAllWishListProducts();
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
}
