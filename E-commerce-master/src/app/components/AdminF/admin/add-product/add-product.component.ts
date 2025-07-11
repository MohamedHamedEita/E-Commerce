import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product-service.service';
import { CategoryService } from 'src/app/services/categories';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  categories: any[] = [];
  brands: any[] = [];
  coverImg: File | null = null;
  images: File[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
    this.loadBrands();
  }

  initForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      quantity: [null, [Validators.required, Validators.min(1)]],
      brand: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res.data;
    });
  }

  loadBrands() {
    this.productService.getAllBrands().subscribe((res) => {
      this.brands = res.data;
    });
  }

  onCoverImageChange(event: any) {
    this.coverImg = event.target.files[0];
  }

  onImagesChange(event: any) {
    this.images = Array.from(event.target.files);
  }

  submit() {
    if (this.productForm.invalid || !this.coverImg) {
      alert('Please fill all required fields and choose a cover image');
      return;
    }

    const formData = new FormData();
    const formValue = this.productForm.value;

    for (const key in formValue) {
      formData.append(key, formValue[key]);
    }

    formData.append('imageCover', this.coverImg);

    this.images.forEach((img, index) => {
      formData.append('images', img);
    });

    this.productService.createProduct(formData).subscribe({
      next: () => {
        alert('✅ Product added successfully!');
        this.router.navigate(['/admin/products']);
      },
      error: (err) => {
        alert(err.error?.message || '❌ Failed to add product');
      },
    });
  }
}
