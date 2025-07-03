import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/interfaces/api-response';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartDetails?: ApiResponse;
  // cartDetails?:any;
  isLoading: boolean = false;

  constructor(
    private _CartService: CartService,
    private _toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this._CartService.getUserCart().subscribe({
      next: (res) => {
        this.cartDetails = res;
        // this.cartDetails=res.data
        console.log(res);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
  removeCartItem(id: string) {
    this.isLoading = true;

    this._CartService.removeCartItem(id).subscribe({
      next: (res) => {
        this.cartDetails = res;
        // this.cartItemsNum.next(res.numOfCartItems) ;
        this._CartService.cartItemsNum.next(res.numOfCartItems);
        this._toaster.error('Remove to cart! ', 'Remove', {
          closeButton: true,
          timeOut: 3000,
          easing: 'ease-in-out',
          progressBar: true,
          progressAnimation: 'increasing',
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  updateCartItem(id: string, count: number) {
    // this.isLoading = true;
    this._CartService.updateCartItem(id, count).subscribe({
      next: (res) => {
        this.cartDetails = res;
        // this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        // this.isLoading = false;
      },
    });
  }
  showSuccess() {
    this._toaster.success('Successfully Add to cart! ', 'Add', {
      closeButton: true,
      timeOut: 3000,
      easing: 'ease-in-out',
      progressBar: true,
      progressAnimation: 'increasing',
    });
  }
  showError() {
    this._toaster.info('You removed an item from the cart  ! ', 'Remove', {
      closeButton: true,
      timeOut: 4000,
      easing: 'ease-in-out',
      progressBar: true,
      progressAnimation: 'increasing',
    });
  }



  ClearUserCart(){
    this._CartService.ClearUserCart().subscribe({
      next: (res) => {
        this.cartDetails = res;
        this._CartService.cartItemsNum.next(0);
        this._toaster.success('Cart cleared successfully!', 'Clear', {
          closeButton: true,
          timeOut: 3000,
          easing: 'ease-in-out',
          progressBar: true,
          progressAnimation: 'increasing',
        });
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
