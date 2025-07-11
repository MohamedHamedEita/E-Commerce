// update-brand.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
})
export class UpdateBrandComponent implements OnInit {
  id!: string;
  name = '';
  image: File | null = null;
  existingImageUrl = '';

  constructor(private brandService: BrandService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.brandService.getBrand(this.id).subscribe((res) => {
      this.name = res.data.name;
      this.existingImageUrl = res.data.image;
    });
  }

  onImageChange(event: any) {
    this.image = event.target.files[0];
  }

  submit() {
    const formData = new FormData();
    if (this.name.trim()) formData.append('name', this.name);
    if (this.image) formData.append('image', this.image);

    this.brandService.updateBrand(this.id, formData).subscribe(() => {
      this.router.navigate(['/admin/brands']);
    });
  }
}
