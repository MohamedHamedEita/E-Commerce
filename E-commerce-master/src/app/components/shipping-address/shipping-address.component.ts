import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css'],
})
export class ShippingAddressComponent implements OnInit {
  errorMessage: string = '';
  cartId: string | null = '';
  isLoading: boolean = false;

  constructor(
    private _CartService: CartService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      // console.log(params.get('id'));
      this.cartId = params.get('id');
    });
  }

  shippingAddressForm: FormGroup = new FormGroup({
    details: new FormControl(null, Validators.required),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    city: new FormControl(null, Validators.required),
  });

  redirectToPaymentPage(url: string) {
    window.location.href = url;
  }
  handleShippingAddress(form: FormGroup) {
    // console.log(form.value);
    this.isLoading = true;

    const finalCartId: string = this.cartId !== null ? this.cartId : '';

    this._CartService.onLinePayMent(finalCartId, form.value).subscribe({
      next: (res) => {
        console.log(res);
        this.redirectToPaymentPage(res.session.url);
        this.isLoading = false;
      },
      error: (err) => {
        // console.log(err.error.message);
        this.errorMessage = err.error.message;
        this.isLoading = false;
      },
    });
  }
}
