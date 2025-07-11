import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/categories';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  categories: any[] = [];

  constructor(private _CategoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    this._CategoryService.getAllCategories().subscribe({
      next: (res) => this.categories = res.data,
      error: (err) => console.error(err)
    });
  }

  deleteCategory(id: string) {
    if (confirm('Are you sure you want to delete this category?')) {
      this._CategoryService.deleteCategory(id).subscribe(() => {
        this.fetchCategories();
      });
    }
  }

  goToAdd() {
    this.router.navigate(['/admin/categories/add']);
  }

  goToEdit(id: string) {
    this.router.navigate(['/admin/categories/edit', id]);
  }
}

