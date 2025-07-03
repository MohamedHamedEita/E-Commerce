import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/iproduct';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit{

  AllBrands:IProduct[]=[];
  isLoading:boolean=false;
constructor(private _ProductService:ProductService){}
  ngOnInit(): void {
    this.isLoading=true;
    this._ProductService.getAllBrands().subscribe({
      next: (response) => {
        console.log(response)
        this.AllBrands=response.data
        this.isLoading=false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading=false;

      }
    })
  }

}
