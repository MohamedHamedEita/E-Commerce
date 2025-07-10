import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  editForm!: FormGroup;
  productId!: string;
  originalProduct: any;
  categories: any[] = [];
  brands: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  imageCoverFile: File | null = null;
  imagesFiles: File[] = [];

  onImageCoverSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageCoverFile = file;
    }
  }

  onImagesSelected(event: any) {
    const files = Array.from(event.target.files) as File[];
    this.imagesFiles = files;
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    this.loadProduct();
    this.loadCategories();
    this.loadBrands();

    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      imageCover: ['', Validators.required],
      images: [[]],
    });
  }

  loadProduct() {
    this.http
      .get(
        `https://car-parts-seven.vercel.app/api/v1/products/${this.productId}`
      )
      .subscribe({
        next: (res: any) => {
          this.originalProduct = res.data;
          this.editForm.patchValue({
            ...res.data,
          });
        },
        error: () => alert('❌ Failed to load product'),
      });
  }

  loadCategories() {
    this.http
      .get('https://car-parts-seven.vercel.app/api/v1/categories')
      .subscribe((res: any) => {
        this.categories = res.data;
      });
  }

  loadBrands() {
    this.http
      .get('https://car-parts-seven.vercel.app/api/v1/brands')
      .subscribe((res: any) => {
        this.brands = res.data;
      });
  }

  submitUpdate() {
    if (!this.editForm.valid) return;

    const changedFields: any = {};
    const values = this.editForm.value;

    for (const key in values) {
      if (values[key] !== this.originalProduct[key]) {
        changedFields[key] = values[key];
      }
    }

    if (Object.keys(changedFields).length === 0) {
      alert('⚠️ Nothing changed!');
      return;
    }

    this.http
      .patch(
        `https://car-parts-seven.vercel.app/api/v1/products/${this.productId}`,
        changedFields,
        { withCredentials: true }
      )
      .subscribe({
        next: () => {
          alert('✅ Product updated!');
          this.router.navigate(['/admin/products']);
        },
        error: () => alert('❌ Failed to update'),
      });
  }
}
