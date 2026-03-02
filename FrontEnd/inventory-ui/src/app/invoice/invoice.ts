import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService, Customer, Product } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface InvoiceItemUI {
  productId: number;
  quantity: number;
  price: number;
  total: number;
}

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice.html',
  styleUrl: './invoice.css'
})
export class InvoiceComponent implements OnInit {

  customers: Customer[] = [];
  products: Product[] = [];

  selectedCustomerId = 0;
  items: InvoiceItemUI[] = [];

  grandTotal = 0;

  successMessage = '';
  errorMessage = '';

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
    this.addRow();
  }

  // Load customers & products
  loadInitialData() {
    this.api.getCustomers().subscribe(data => {
      this.customers = data;
      this.cdr.detectChanges();
    });

    this.api.getProducts().subscribe(data => {
      this.products = data;
      this.cdr.detectChanges();
    });
  }

  addRow() {
    this.items.push({
      productId: 0,
      quantity: 1,
      price: 0,
      total: 0
    });
  }

  removeRow(index: number) {
    this.items.splice(index, 1);
    this.calculateGrandTotal();
  }

  updateRow(item: InvoiceItemUI) {
    const product = this.products.find(p => p.id === Number(item.productId));

    if (product) {
      item.price = product.price;
      item.total = product.price * item.quantity;
    } else {
      item.price = 0;
      item.total = 0;
    }

    this.calculateGrandTotal();
  }

  calculateGrandTotal() {
    this.grandTotal = this.items.reduce((sum, item) => sum + item.total, 0);
  }

  saveInvoice() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.selectedCustomerId) {
      this.errorMessage = 'Please select a customer';
      this.cdr.detectChanges();
      return;
    }

    const validItems = this.items.filter(i => i.productId && i.quantity > 0);

    if (validItems.length === 0) {
      this.errorMessage = 'Add at least one valid product';
      this.cdr.detectChanges();
      return;
    }

    const invoice = {
      customerId: Number(this.selectedCustomerId),
      date: new Date().toISOString(),
      total: this.grandTotal,
      items: validItems.map(i => ({
        productId: i.productId,
        quantity: i.quantity,
        price: i.price
      }))
    };

    this.api.addInvoice(invoice).subscribe({
      next: () => {
        this.successMessage = 'Invoice saved successfully!';
        this.items = [];
        this.grandTotal = 0;
        this.addRow();
        this.cdr.detectChanges();
      },
      error: err => {
        this.errorMessage = err.error || 'Failed to save invoice';
        this.cdr.detectChanges();
      }
    });
  }
}