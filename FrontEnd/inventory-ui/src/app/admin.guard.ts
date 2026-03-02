import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // must be logged in first
  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // must be admin
  if (!auth.isAdmin()) {
    router.navigate(['/invoice']); // redirect normal users
    return false;
  }

  return true;
};