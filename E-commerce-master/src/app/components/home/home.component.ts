import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/iproduct';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allProducts: IProduct[] = [];
  searchItem: string = '';
  isLoading: boolean = false;
  constructor(private _ProductService: ProductService) {}
  ngOnInit(): void {
    this.isLoading = true;
    this._ProductService.getAllProducts().subscribe({
      next: (res) => {
        // console.log(res)
        this.allProducts = res.data;
        this.isLoading = false;

        // console.log(res.data)
        // console.log(res.data[1])
        // console.log(res.data[1].brand)
        // console.log(res.data[1].brand.name)
      },
      error: (err) => {
        this.isLoading = false;

        // console.log(err);
      },
    });
  }
}
