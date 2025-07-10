import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  isSubmitting = false;
  categories: any[] = [];
  brands: any[] = [];

  coverImage: File | null = null;
  extraImages: File[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      brand: ['', Validators.required],
    });

    this.fetchCategories();
    this.fetchBrands();
  }

  fetchCategories() {
    this.http
      .get<any>('http://localhost:3000/api/v1/categories')
      .subscribe((res) => (this.categories = res.data || []));
  }

  fetchBrands() {
    this.http
      .get<any>('http://localhost:3000/api/v1/brands')
      .subscribe((res) => (this.brands = res.data || []));
  }

  onCoverImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.coverImage = file;
      this.cdr.detectChanges(); // Refresh UI
    }
  }

  onImagesChange(event: any) {
    this.extraImages = Array.from(event.target.files);
  }

  onSubmit() {
    if (this.productForm.invalid || !this.coverImage) return;

    const formData = new FormData();
    Object.entries(this.productForm.value).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    formData.append('imageCover', this.coverImage);
    this.extraImages.forEach((img) => formData.append('images', img));

    this.isSubmitting = true;

    this.http
      .post('http://localhost:3000/api/v1/products', formData, {
        withCredentials: true,
      })
      .subscribe({
        next: () => {
          alert('✅ Product added!');
          this.productForm.reset();
          this.coverImage = null;
          this.extraImages = [];
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error(err);
          alert('❌ Failed to add product');
          this.isSubmitting = false;
        },
      });
  }
}
