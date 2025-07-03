import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-main-slider',
  templateUrl: './home-main-slider.component.html',
  styleUrls: ['./home-main-slider.component.css']
})
export class HomeMainSliderComponent {
  constructor(){}

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    items:1,
     autoplay:true,
    autoplayHoverPause:true,
    autoplayTimeout:2000,

  }

}
