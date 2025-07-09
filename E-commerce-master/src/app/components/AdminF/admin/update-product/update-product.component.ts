import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  products: any[] = [];
  selectedProduct: any = null;
  editForm!: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadProducts();

    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(1)]]
    });
  }

  loadProducts(): void {
    this.http.get('https://car-parts-seven.vercel.app/api/v1/products').subscribe({
      next: (res: any) => {
        this.products = res.data || [];
      },
      error: () => alert('❌ Failed to load products')
    });
  }

  editProduct(product: any): void {
    this.selectedProduct = product;
    this.editForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price
    });
  }

  submitUpdate(): void {
    if (!this.selectedProduct || this.editForm.invalid) return;

    this.http.put(
      `https://car-parts-seven.vercel.app/api/v1/products/${this.selectedProduct._id}`,
      this.editForm.value
    ).subscribe({
      next: () => {
        alert('✅ Product updated successfully!');
        this.selectedProduct = null;
        this.editForm.reset();
        this.loadProducts();
      },
      error: () => alert('❌ Failed to update product')
    });
  }

  cancelEdit(): void {
    this.selectedProduct = null;
    this.editForm.reset();
  }
}
