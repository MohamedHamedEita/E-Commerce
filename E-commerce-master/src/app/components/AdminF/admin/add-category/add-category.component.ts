import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/categories';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  name: string = '';
  image: File | null = null;

  constructor(private _CategoryService: CategoryService, private router: Router) {}

  onImageChange(event: any) {
    this.image = event.target.files[0];
  }

  submit() {
    const formData = new FormData();
    formData.append('name', this.name);
    if (this.image) formData.append('image', this.image);

    this._CategoryService.addCategory(formData).subscribe(() => {
      this.router.navigate(['/admin/categories']);
    });
  }
}

