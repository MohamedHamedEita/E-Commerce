import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css'],
})
export class UserSidebarComponent implements OnInit {
  user: any = {};

  constructor(
    private http: HttpClient,
    private router: Router,
    private _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.http
      .get('http://localhost:3000/api/v1/users/getMe', {
        withCredentials: true,
      })
      .subscribe({
        next: (res: any) => {
          this.user = res.data;
        },
        error: (err) => {
          console.error('Failed to load user data', err);
        },
      });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    this._AuthService.logout(); // Call centralized logout
  }
}
