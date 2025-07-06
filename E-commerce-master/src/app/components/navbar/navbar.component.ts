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
  userInfo: any = null;
  numOfCartItems: number = 0;
  wishListCount: number = 0;
  userName: string = '';

  constructor(
    private _AuthService: AuthService,
    private _CartService: CartService,
    private _WishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    // ✅ راقب حالة الدخول
    this._AuthService.isLogin.subscribe((isLogged) => {
      this.isUserLogin = isLogged;

      if (isLogged) {
        // ✅ جلب بيانات المستخدم بعد تسجيل الدخول
        this._AuthService.getCurrentUser().subscribe({
          next: (res) => {

            this.userInfo = res.data;
            this.userName = res.data?.name || '';

          },
          error: (err) => {
            console.error('❌ Error fetching user data from getMe:', err);
          },
        });
      } else {
        this.userInfo = null;
        this.userName = '';
      }
    });

    // ✅ تحديث عدد عناصر السلة
    this._CartService.cartItemsNum.subscribe((num) => {
      this.numOfCartItems = num;
    });

    // ✅ تحديث عدد عناصر الـ wishlist
    this._WishlistService.wishListItemsCount.subscribe((count) => {
      this.wishListCount = count;
    });
  }

  handelLogout() {
    this._AuthService.logout();
  }
}
