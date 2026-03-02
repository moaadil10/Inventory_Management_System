import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService, Customer } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class CustomersComponent implements OnInit {

  customers: Customer[] = [];

  name = '';
  phone = '';

  editingCustomerId: number | null = null;

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef   // ⭐ inject
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  // ======================
  // LOAD
  // ======================
  loadCustomers() {
    this.api.getCustomers().subscribe(data => {
      this.customers = data;
      this.cdr.detectChanges();   // ⭐ FIX
    });
  }

  // ======================
  // ADD
  // ======================
  addCustomer() {
    if (!this.name) return;

    const newCustomer: Customer = {
      name: this.name,
      phone: this.phone
    };

    this.api.addCustomer(newCustomer).subscribe(() => {
      this.name = '';
      this.phone = '';
      this.loadCustomers();
    });
  }

  // ======================
  // EDIT
  // ======================
  editCustomer(customer: Customer) {
    this.editingCustomerId = customer.id!;
  }

  // ======================
  // UPDATE
  // ======================
  updateCustomer(customer: Customer) {
    this.api.updateCustomer(customer.id!, customer).subscribe(() => {
      this.editingCustomerId = null;
      this.loadCustomers();
    });
  }

  // ======================
  // DELETE
  // ======================
  deleteCustomer(id: number) {
    if (!confirm('Delete this customer?')) return;

    this.api.deleteCustomer(id).subscribe(() => {
      this.loadCustomers();
    });
  }
}