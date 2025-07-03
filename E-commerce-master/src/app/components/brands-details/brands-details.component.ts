import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/interfaces/brand';
 import { IProduct } from 'src/app/interfaces/iproduct';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-brands-details',
  templateUrl: './brands-details.component.html',
  styleUrls: ['./brands-details.component.css']
})
export class BrandsDetailsComponent implements OnInit {
  brandId: string | null = '';
   brandDetails: Brand[] = [];
  isLoading:boolean=false;

  constructor(
    private _ProductService: ProductService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.isLoading = true;
    this._ActivatedRoute.paramMap.subscribe((params) => {
      console.log(params.get('id'));
      this.brandId = params.get('id');
      if (this.brandId) {
        this._ProductService.getBrandsPyId(this.brandId).subscribe({
          next: (response) => {
            console.log(response);
            this.brandDetails = response.data;
            this.isLoading = false;
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;
          },
        })
      }
    });
  }
}
