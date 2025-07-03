import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isUserLogin: boolean = false;
  userInfo: any = {};
  numOfCartItems: number = 0;
  wishListCount: number = 0;

  constructor(
    private _AuthService: AuthService,
    private _CartService: CartService,
    private _WishlistService: WishlistService
  ) {}
  ngOnInit(): void {
    this._AuthService.isLogin.subscribe((isLogged) => {
      this.isUserLogin = isLogged;
    });
    this._CartService.cartItemsNum.subscribe({
      next: (numS) => {
        this.numOfCartItems = numS;
      },
    });
    this._WishlistService.wishListItemsCount.subscribe((count) => {
      this.wishListCount = count;
    });
  }
  handelLogout() {
    // localStorage.removeItem('userToken');
    this._AuthService.logOut();
  }
}
