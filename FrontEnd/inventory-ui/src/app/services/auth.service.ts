import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = 'http://localhost:5277/api/Auth';

  constructor(private http: HttpClient) {}

  // 🔐 Login API
  login(data: any) {
    return this.http.post<any>(`${this.baseUrl}/login`, data);
  }

  // 💾 Save JWT data
  saveUser(data: any) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    localStorage.setItem('username', data.username);
  }

  // 🔎 Get token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // 🔎 Get role
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // 🔎 Get username
  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  // 🚪 Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
  }

  // 🔎 Check login
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // 🛡 Check admin role
  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }
}