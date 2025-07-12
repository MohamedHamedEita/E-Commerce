import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/iproduct';
import { CartService } from 'src/app/services/cart.service';
// import { ProductService } from 'src/app/services/product-service.service';
// import { ToasterService } from 'src/app/services/toaster.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';
import { isPlainObject } from 'jquery';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: IProduct[] = [];
  isLoading: boolean = false;
  @Input() product!: IProduct;
  wishListProductIdsList: string[] = [];
  // isAddedToWishlist: boolean = false;
  // wishListProduct:string[]=[]
  constructor(
    private _CartService: CartService,
    private _toaster: ToastrService,
    private _ProductService: ProductService ,
    private _WishlistService: WishlistService
  ) {}
  ngOnInit(): void {
    this._WishlistService.wishListProductIds.subscribe({
      next: (idsList) => {
        this.wishListProductIdsList = idsList;
      },
    });
    // this.product.isInWishlist = this._ProductService.wishlistProducts.includes(this.product._id);
    // this._ProductService.getAllProducts().subscribe({
    //   next: (res) => {
    //     this.products = res.data;
    //   },
    //   error: (err) => {
    //     console.error('Error loading products:', err);
    //   },
    // });
    // this._ProductService.wishListProductId.subscribe((idsList)=>{this.wishListProduct=idsList})
  }

  // isProductId(id:string){

  //   return this.wishListProduct.includes(id)
  // }

  addToCart(id: string) {
    this.isLoading = true;
    this._CartService.addCartItem(id).subscribe({
      next: (res) => {
        // console.log(res);
        this.isLoading = false;
    this._CartService.updateCartItemCount();
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
        this._toaster.error(
          err.error?.message || 'Failed to add to Cart',
          'Error'
        );
        this.isLoading = false;
        // this.toastr.showError();
      },
    });
  }

addToWishlist(productId: string): void {
  this.isLoading = true;

  this._WishlistService.addToWishlist(productId).subscribe({
    next: (res) => {
      this._toaster.success(res.message || 'Added to Wishlist!', 'Success', {
        closeButton: true,
        timeOut: 3000,
        easing: 'ease-in-out',
        progressBar: true,
        progressAnimation: 'increasing',
      });

      this.isLoading = false;

      // ✅ Use centralized method for consistency
      this._WishlistService.updateLoggedUserWishListAndCount();
    },
    error: (err) => {
      this._toaster.error(
        err.error?.message || 'Failed to add to Wishlist',
        'Error',
        {
          closeButton: true,
          timeOut: 3000,
          easing: 'ease-in-out',
          progressBar: true,
          progressAnimation: 'increasing',
        }
      );
      this.isLoading = false;
    },
  });
}


  isWishListProduct(id: string) {
    return this.wishListProductIdsList.includes(id);
  }
}
