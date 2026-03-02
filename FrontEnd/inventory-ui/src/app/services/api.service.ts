import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// =====================
// MODELS
// =====================

export interface Customer {
  id?: number;
  name: string;
  phone: string;
}

export interface Product {
  id?: number;
  name: string;
  price: number;
  stock: number;
}

export interface InvoiceItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface Invoice {
  id?: number;
  customerId: number;
  date?: string;
  total?: number;
  isCancelled?: boolean;
  items: InvoiceItem[];
}

// =====================
// SERVICE
// =====================

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // 🔁 Change port only here if needed
  private baseUrl = 'http://localhost:5277/api';

  constructor(private http: HttpClient) {}

  // =========================================================
  // CUSTOMER APIs
  // =========================================================

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/Customer`);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.baseUrl}/Customer`, customer);
  }

  updateCustomer(id: number, customer: Customer) {
    return this.http.put(`${this.baseUrl}/Customer/${id}`, customer);
  }

  deleteCustomer(id: number) {
    return this.http.delete(`${this.baseUrl}/Customer/${id}`);
  }

  // =========================================================
  // PRODUCT APIs
  // =========================================================

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/Product`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/Product`, product);
  }

  updateProduct(id: number, product: Product) {
    return this.http.put(`${this.baseUrl}/Product/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.baseUrl}/Product/${id}`);
  }

  // =========================================================
  // INVOICE APIs
  // =========================================================

  getInvoices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Invoice`);
  }

  addInvoice(invoice: Invoice): Observable<any> {
    return this.http.post(`${this.baseUrl}/Invoice`, invoice);
  }

  cancelInvoice(id: number) {
    return this.http.put(`${this.baseUrl}/Invoice/cancel/${id}`, {});
  }

  // =========================================================
  // DASHBOARD APIs
  // =========================================================

  getDashboard(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Dashboard`);
  }

  // =========================================================
  // USER APIs (ADMIN)
  // =========================================================
  // ⚠️ Ensure your controller route is: [Route("api/User")]

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Users`);
  }

  addUser(user: any) {
    return this.http.post(`${this.baseUrl}/Users`, user);
  }

  updateUser(id: number, user: any) {
    return this.http.put(`${this.baseUrl}/Users/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/Users/${id}`);
  }
}