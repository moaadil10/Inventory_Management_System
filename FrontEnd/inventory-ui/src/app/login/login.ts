import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // ⭐ REQUIRED
  templateUrl: './login.html'
})
export class LoginComponent {

  username = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) { }

  login() {
    this.errorMessage = '';

    this.auth.login({ username: this.username, password: this.password })
      .subscribe({
        next: (data) => {
          this.auth.saveUser(data);   // ⭐ stores token & role
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.errorMessage = 'Invalid username or password';
        }
      }); 
  }
}