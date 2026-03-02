import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html'
})
export class UsersComponent implements OnInit {

  users: any[] = [];
  username = '';
  password = '';
  role = 'User';
  editingId: number | null = null;

  loading = true;
  errorMessage = '';

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // ================= LOAD USERS =================
  loadUsers() {
    this.loading = true;

    this.api.getUsers().subscribe({
      next: data => {
        this.users = data;
        this.loading = false;

        // ⭐ Fix first-click rendering
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load users';
        this.loading = false;
      }
    });
  }

  // ================= ADD USER =================
  addUser() {
    if (!this.username || !this.password) return;

    this.api.addUser({
      username: this.username,
      password: this.password,
      role: this.role
    }).subscribe(() => {
      this.resetForm();
      this.loadUsers();
    });
  }

  // ================= EDIT =================
  editUser(user: any) {
    this.editingId = user.id;
    this.username = user.username;
    this.role = user.role;
    this.password = '';
  }

  // ================= UPDATE =================
  updateUser(id: number) {
    this.api.updateUser(id, {
      username: this.username,
      role: this.role,
      password: this.password
    }).subscribe(() => {
      this.resetForm();
      this.loadUsers();
    });
  }

  // ================= DELETE =================
  deleteUser(id: number) {
    if (!confirm('Delete user?')) return;

    this.api.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  // ================= RESET =================
  resetForm() {
    this.username = '';
    this.password = '';
    this.role = 'User';
    this.editingId = null;
  }
}