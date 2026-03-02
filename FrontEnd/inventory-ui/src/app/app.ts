import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';   // ⭐ ADD THIS
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule   // ⭐ REQUIRED FOR *ngIf
  ],
  templateUrl: './app.html'
})
export class AppComponent {

  constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout();
    location.reload();
  }

  toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark');
  body.classList.toggle('light');
}
}