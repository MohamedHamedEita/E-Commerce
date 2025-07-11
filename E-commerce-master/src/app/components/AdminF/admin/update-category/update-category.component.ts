import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/categories';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  id!: string;
  name: string = '';
  image: File | null = null;
  imageUrl: string = '';

  constructor(
    private _CategoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
    ,
        private _toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this._CategoryService.getCategory(this.id).subscribe({
      next: (res) => {
        this.name = res.data.name;
        this.imageUrl = res.data.image;
      }
    });
  }

  onImageChange(event: any) {
    this.image = event.target.files[0];
  }

  submit() {
    const formData = new FormData();
    if (this.name.trim()) formData.append('name', this.name);
    if (this.image) formData.append('image', this.image);

    this._CategoryService.updateCategory(this.id, formData).subscribe({
      next:() => {
      this.router.navigate(['/admin/categories']);
    }, error: (err) => this._toaster.error(err.error?.message || 'Update failed','Error')

    });
  }
}
