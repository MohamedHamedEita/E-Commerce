import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product-service.service';
import { IProduct } from 'src/app/interfaces/iproduct';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  searchItem: string = '';
  isLoading: boolean = true;

  // Pagination
  currentPage: number = 1;
  pageSize: number = 8;
  totalPages: number = 1;

  // Filters
  selectedCategory: string = '';
  selectedBrand: string = '';
  minRating: number = 0;
  maxPrice: number = 10000;

  // Filter options from backend
  categories: any[] = [];
  brands: any[] = [];

  selectedSort: string = '-price'; // default: High → Low

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.loadFilterOptions();

    this.route.paramMap.subscribe((params) => {
      const categoryId = params.get('categoryId');
      const brandId = params.get('brandId');

      if (categoryId) {
        this.selectedCategory = categoryId;
      }

      if (brandId) {
        this.selectedBrand = brandId;
      }

      this.currentPage = 1;
      this.fetchProducts();
    });
  }

  loadFilterOptions(): void {
    this.productService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data; // Ensure your backend sends { data: [...] }
      },
      error: (err) => console.error('Error loading categories:', err),
    });

    this.productService.getAllBrands().subscribe({
      next: (res) => {
        this.brands = res.data;
      },
      error: (err) => console.error('Error loading brands:', err),
    });
  }

  fetchProducts(): void {
    this.isLoading = true;

    this.productService
      .getProductsPaginated(
        this.currentPage,
        this.pageSize,
        this.searchItem,
        this.selectedCategory, // <-- now used
        this.selectedBrand,
        this.minRating,
        this.maxPrice,
        this.selectedSort
      )
      .subscribe({
        next: (res) => {
          this.products = res.data;
          this.totalPages = res.paginationResult?.numberOfPages || 1;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching products:', err);
          this.isLoading = false;
        },
      });
  }

  changePage(page: number): void {
    if (page === this.currentPage || page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.fetchProducts();
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.fetchProducts();
  }

  onFiltersChanged(filters: any): void {
    this.selectedCategory = filters.category;
    this.selectedBrand = filters.brand;
    this.minRating = filters.minRating;
    this.maxPrice = filters.maxPrice;
    this.currentPage = 1;
    this.fetchProducts();
  }

  onSortChange(sortValue: string): void {
    this.selectedSort = sortValue;
    this.currentPage = 1;
    this.fetchProducts();
  }
}
