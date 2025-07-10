import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class AdminProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        this.products = res.products || res.data || res;
      },
      error: () => {
        console.error('❌ Failed to load products');
      },
    });
  }

  deleteProduct(productId: string): void {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        alert('✅ Product deleted successfully');
        this.getAllProducts(); // Refresh the list
      },
      error: () => {
        alert('❌ Failed to delete product');
      },
    });
  }
}
