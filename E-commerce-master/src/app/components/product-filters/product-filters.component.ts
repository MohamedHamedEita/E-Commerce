import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.css'],
})
export class ProductFiltersComponent {
  @Input() categories: any[] = [];
  @Input() brands: any[] = [];

  @Input() selectedCategory: string = '';
  @Input() selectedBrand: string = '';
  @Output() filtersChanged = new EventEmitter<any>();

  minRating: number = 0;
  maxPrice: number = 10000;

  emitFilters(): void {
    this.filtersChanged.emit({
      category: this.selectedCategory,
      brand: this.selectedBrand,
      minRating: this.minRating,
      maxPrice: this.maxPrice,
    });
  }
}
