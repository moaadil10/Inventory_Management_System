import { Routes } from '@angular/router';

import { LoginComponent } from './login/login';
import { CustomersComponent } from './customers/customers';
import { ProductsComponent } from './products/products';
import { InvoiceComponent } from './invoice/invoice';
import { InvoiceHistoryComponent } from './invoice-history/invoice-history';
import { DashboardComponent } from './dashboard/dashboard';
import { UsersComponent } from './users/users';

import { adminGuard } from './admin.guard';
import { authGuard } from './auth.guard';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },

  // ⭐ Root redirect (IMPORTANT)
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // 🔒 Admin-only routes
  { path: 'dashboard', component: DashboardComponent, canActivate: [adminGuard] },
  { path: 'customers', component: CustomersComponent, canActivate: [authGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [adminGuard] },
  { path: 'users', component: UsersComponent, canActivate: [adminGuard] },

  // 🔓 Logged-in users
  { path: 'invoice', component: InvoiceComponent, canActivate: [authGuard] },
  { path: 'history', component: InvoiceHistoryComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: 'login' }
];