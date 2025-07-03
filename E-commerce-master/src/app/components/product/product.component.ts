import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/iproduct';
import { CartService } from 'src/app/services/cart.service';
// import { ProductService } from 'src/app/services/product-service.service';
// import { ToasterService } from 'src/app/services/toaster.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: IProduct[] = [];
  isLoading: boolean = false;
  @Input() product!: IProduct;
  wishListProductIdsList:string[]=[]
  // isAddedToWishlist: boolean = false;
  // wishListProduct:string[]=[]
  constructor(
    private _CartService: CartService,
    private _toaster: ToastrService,
    // private _ProductService: ProductService
    private _WishlistService: WishlistService
  ) {}
  ngOnInit(): void {

    this._WishlistService.wishListProductIds.subscribe({
      next: (idsList)=>{this.wishListProductIdsList=idsList}
    })
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

  addToWishlist(productId: string) {
    this.isLoading = true;
    this._WishlistService.addToWishlist(productId).subscribe({
      next: (res) => {
        console.log(res);
        this._toaster.success(res.message, 'product Add!');
        this.isLoading = false;
        this._WishlistService.wishListProductIds.next(res.data);
        this._WishlistService.wishListItemsCount.next(res.data.length)
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });

    // addToWishlist(product: IProduct) {
    //   this._ProductService.addToWishlist(product).subscribe({
    //     next: (res) => {
    //       this.product.isInWishlist = true;

    //       console.log(res);
    //       this.isAddedToWishlist = true;
    //        this._ProductService.wishListItemsNum.next(res.count);
    //       this._ProductService.wishListProductId.next(res.data)

    //       this._toaster.success('Successfully added to Wishlist! ', 'Added',{
    //         closeButton: true,
    //         timeOut: 3000,
    //         easing:'ease-in-out',
    //         progressBar: true,
    //         progressAnimation: 'increasing',
    //        });
    //     },
    //     error: (err) => {
    //       console.error('Error adding product to wishlist:', err);
    //       this._toaster.error('Remove to Wishlist! ', 'Remove',{
    //         closeButton: true,
    //         timeOut: 3000,
    //         easing:'ease-in-out',
    //         progressBar: true,
    //         progressAnimation: 'increasing',
    //        });
    //        this.isAddedToWishlist = false;

    //     },
    //   });
    // }
  }

isWishListProduct(id:string){
  return this.wishListProductIdsList.includes(id)
}

}
