import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalCartPrice: number = 0;
  cartId: string = '';
  isLoading: boolean = false;

  constructor(
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.isLoading = true;
    this.cartService.getUserCart().subscribe({
      next: (res) => {
        this.cartItems = res.data.cartItems || [];
        this.totalCartPrice = res.data.totalCartPrice;
        this.cartId = res.data._id;
        this.isLoading = false;
        console.log(this.cartItems);
      },
      error: (err) => {
        console.error('Error loading cart:', err);
        this.isLoading = false;
      },
    });
  }

  removeCartItem(id: string): void {
    this.isLoading = true;
    this.cartService.removeCartItem(id).subscribe({
      next: (res) => {
        this.toastr.info('Item removed from cart.', 'Removed');
        this.loadCart();
        this.cartService.cartItemsNum.next(res.numOfCartItems);
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  updateCartItem(id: string, count: number): void {
    if (count < 1) return; // prevent quantity < 1
    this.cartService.updateCartItem(id, count).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error(err),
    });
  }

  clearCart(): void {
    this.cartService.ClearUserCart().subscribe({
      next: () => {
        this.cartItems = [];
        this.totalCartPrice = 0;
        this.toastr.success('Cart cleared successfully!', 'Cleared');
        this.cartService.cartItemsNum.next(0);
      },
      error: (err) => console.error(err),
    });
  }
}
