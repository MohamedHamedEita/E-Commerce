import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interfaces/iproduct';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-category-product',
  templateUrl: './category-product.component.html',
  styleUrls: ['./category-product.component.css'],
})
export class CategoryProductComponent implements OnInit {
  categoryId: string | null = '';
  allProducts: IProduct[] = [];
  isLoading:boolean=false;

  constructor(
    private _ProductService: ProductService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.isLoading = true;
    this._ActivatedRoute.paramMap.subscribe((params) => {
      console.log(params.get('id'));
      this.categoryId = params.get('id');
      if (this.categoryId) {
        this._ProductService.getProductByCategory(this.categoryId).subscribe({
          next: (response) => {
            console.log(response);
            this.allProducts = response.data;
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
