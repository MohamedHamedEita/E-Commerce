// admin.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private baseUrl = 'http://localhost:3000/api/v1/users'; // Adjust as needed

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<{ users: any[] }>(`${this.baseUrl}/`, {
      withCredentials: true,
    });
  }

  updateUserStatus(userId: string, active: boolean) {
    return this.http.patch(
      `${this.baseUrl}/${userId}/activate`,
      { active },
      { withCredentials: true }
    );
  }

  updateUserRole(userId: string, role: string) {
    return this.http.patch(
      `${this.baseUrl}/${userId}/updateRole`,
      { role },
      { withCredentials: true }
    );
  }
}
