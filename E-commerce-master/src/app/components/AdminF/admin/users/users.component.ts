import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service'; // Adjust the path if needed

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.adminService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res.data;
      },
      error: () => {
        this.toastr.error('Failed to load users');
      },
    });
  }

  toggleActive(userId: string, isActive: boolean): void {
    this.adminService.updateUserStatus(userId, !isActive).subscribe({
      next: () => {
        this.toastr.success('User status updated');
        this.getAllUsers();
      },
      error: () => {
        this.toastr.error('Failed to update user status');
      },
    });
  }

  toggleRole(userId: string, currentRole: string): void {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    this.adminService.updateUserRole(userId, newRole).subscribe({
      next: () => {
        this.toastr.success('User role updated');
        this.getAllUsers();
      },
      error: () => {
        this.toastr.error('Failed to update user role');
      },
    });
  }
}
