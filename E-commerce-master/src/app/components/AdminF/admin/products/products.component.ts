import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class AdminProductsComponent implements OnInit {
  products: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 20;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService
      .getProductsPaginated(this.currentPage, this.limit)
      .subscribe({
        next: (res: any) => {
          this.products = res.data;
          this.totalPages = res.paginationResult?.numberOfPages || 1;
        },
        error: () => {
          console.error('❌ Failed to load paginated products');
        },
      });
  }

  deleteProduct(productId: string): void {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        alert('✅ Product deleted successfully');
        this.fetchProducts(); // Refresh the list
      },
      error: (err) => {
        alert(err.error?.message || '❌ Failed to delete product');
      },
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.fetchProducts();
  }
}

