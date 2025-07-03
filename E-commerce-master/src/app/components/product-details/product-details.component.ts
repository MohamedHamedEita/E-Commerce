import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interfaces/iproduct';
import { ProductService } from 'src/app/services/product-service.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productId?: string | null;
  productDetail?: IProduct | undefined;
  isLoading: boolean = false;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _toaster: ToastrService
  ) {}
  ngOnInit(): void {
    this.isLoading = true;

    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id');
    });
    if (this.productId != null) {
      this._ProductService.getProductById(this.productId).subscribe({
        next: (response) => {
          console.log(response);
          this.productDetail = response.data;
          console.log(this.productDetail);
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
        },
      });
    }
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 2000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };

  addToCart(id: string) {
    this.isLoading = true;

    this._CartService.addCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.cartItemsNum.next(res.numOfCartItems);
        this._toaster.success('Successfully added to cart! ', 'Added', {
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
}
