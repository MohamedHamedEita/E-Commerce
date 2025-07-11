import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interfaces/iproduct';
import { ProductService } from 'src/app/services/product-service.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { WishlistService } from 'src/app/services/wishlist.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productId?: string | null;
  productDetail?: IProduct | undefined;
  isLoading: boolean = false;
  reviews: any[] = [];

  isAdmin: boolean = false;
  showReviewForm: boolean = false;
  reviewForm!: FormGroup;
  showImages: boolean = false;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductService: ProductService,
    private _wishlistService: WishlistService,
    private _CartService: CartService,
    private _toaster: ToastrService,
    private _userService: UserService,
    private _authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    // ✅ Setup form
    this.reviewForm = this.fb.group({
      title: ['', Validators.required],
      ratings: [
        null,
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
    });

    // ✅ Check if current user is admin
    this._authService.getCurrentUser().subscribe({
      next: (user) => {
        this.isAdmin = user?.role === 'admin';
      },
      error: () => {
        this.isAdmin = false;
      },
    });

    // ✅ Fetch product and reviews
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id');

      if (this.productId != null) {
        forkJoin({
          product: this._ProductService.getProductById(this.productId),
          reviews: this._ProductService.getReviewsByProductId(this.productId),
        }).subscribe({
          next: ({ product, reviews }) => {
            this.productDetail = product.data;
            this.reviews = reviews.data;

            // ✅ Set showImages flag
            this.showImages = !!(
              this.productDetail?.images && this.productDetail.images.length > 0
            );

            this.isLoading = false;
          },
          error: (error) => {
            console.error(error);
            this.isLoading = false;
          },
        });
      }
    });
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
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 4 },
    },
    nav: false,
  };

  addToCart(id: string) {
    this.isLoading = true;
    this._CartService.addCartItem(id).subscribe({
      next: (res) => {
        this._CartService.cartItemsNum.next(res.numOfCartItems);
        this._toaster.success('Successfully added to cart!', 'Added', {
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
        this._toaster.error(
          err.error?.message || 'Failed to add to Cart',
          'Error'
        );
        this.isLoading = false;
      },
    });
  }

  addToWishList(productId: string) {
    this.isLoading = true;
    this._wishlistService.addToWishlist(productId).subscribe({
      next: () => {
        this._toaster.success('Added to wishlist!', 'Success', {
          closeButton: true,
          timeOut: 3000,
          easing: 'ease-in-out',
          progressBar: true,
          progressAnimation: 'increasing',
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error adding to wishlist:', err);
        this._toaster.error(
          err.error?.message || 'Failed to add to wishlist',
          'Error'
        );
        this.isLoading = false;
      },
    });
  }

  submitReview() {
    if (this.reviewForm.valid && this.productId) {
      const reviewData = this.reviewForm.value;

      this._ProductService.submitReview(this.productId, reviewData).subscribe({
        next: (res: any) => {
          this._toaster.success('Review submitted successfully!', 'Success');
          this.reviews.unshift(res.data); // Add to top
          this.reviewForm.reset();
          this.showReviewForm = false;
        },
        error: (err: any) => {
          console.error('Review submission failed', err);
          this._toaster.error('Failed to submit review', 'Error');
        },
      });
    }
  }
}
