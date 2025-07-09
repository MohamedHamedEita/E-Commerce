import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {
constructor(private _AuthService: AuthService ,private _Router : Router ){}
  ngOnInit(): void {
  this._AuthService.getCurrentUser().subscribe({
    next: (res) => {
      if (res?.data?.role !== 'admin') {
        this._Router.navigate(['/home']); // prevent normal user access
      }
    }
  });
}

}
