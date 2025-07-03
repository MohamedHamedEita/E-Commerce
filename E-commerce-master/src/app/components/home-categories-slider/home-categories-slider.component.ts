import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ICategory } from 'src/app/interfaces/ictegory';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-home-categories-slider',
  templateUrl: './home-categories-slider.component.html',
  styleUrls: ['./home-categories-slider.component.css'],
})
export class HomeCategoriesSliderComponent implements OnInit {
  allCategories: ICategory[] = [];

  constructor(private _ProductService: ProductService) {}
  ngOnInit(): void {
    this._ProductService.getAllCategories().subscribe({
      next: (response) => {
        console.log(response.data);
        this.allCategories = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
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
        items: 7,
      },
    },
    nav: false,
  };
}
