import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/iproduct';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  AllCategories:IProduct[]=[];
  isLoading:boolean=false;
constructor(private _ProductService:ProductService){}
  ngOnInit(): void {
    this.isLoading=true;
    this._ProductService.getAllCategories().subscribe({
      next: (response) => {
        console.log(response)
        this.AllCategories=response.data
        this.isLoading=false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading=false;

      }
    })
  }

}
