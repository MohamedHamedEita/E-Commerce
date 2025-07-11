// brands.component.ts
import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class AdminBrandsComponent implements OnInit {
  brands: any[] = [];
  isLoading = false;

  constructor(private brandService: BrandService, private router: Router) {}

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands() {
    this.isLoading = true;
    this.brandService.getAllBrands().subscribe({
      next: (res:any) => {
        this.brands = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  deleteBrand(id: string) {
    if (!confirm('Are you sure you want to delete this brand?')) return;

    this.brandService.deleteBrand(id).subscribe({
      next: () => {
        this.loadBrands();
      }
    });
  }
}
