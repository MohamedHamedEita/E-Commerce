// add-brand.component.ts
import { Component } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
})
export class AddBrandComponent {
  name = '';
  image: File | null = null;

  constructor(private brandService: BrandService, private router: Router) {}

  onImageChange(event: any) {
    this.image = event.target.files[0];
  }

  submit() {
    const formData = new FormData();
    formData.append('name', this.name);
    if (this.image) formData.append('image', this.image);

    this.brandService.addBrand(formData).subscribe(() => {
      this.router.navigate(['/admin/brands']);
    });
  }
}
