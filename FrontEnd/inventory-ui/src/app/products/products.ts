import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService, Product } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  name = '';
  price = 0;
  stock = 0;
  editingProductId: number | null = null;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.api.getProducts().subscribe(data => {
      this.products = data;
      this.cdr.detectChanges(); // ⭐ FIX
    });
  }

  addProduct() {
    if (!this.name || this.price <= 0) return;

    const newProduct: Product = {
      name: this.name,
      price: this.price,
      stock: this.stock
    };

    this.api.addProduct(newProduct).subscribe(() => {
      this.name = '';
      this.price = 0;
      this.stock = 0;
      this.loadProducts();
    });
  }

  editProduct(product: Product) {
    this.editingProductId = product.id!;
  }

  updateProduct(product: Product) {
    this.api.updateProduct(product.id!, product).subscribe(() => {
      this.editingProductId = null;
      this.loadProducts();
    });
  }

  deleteProduct(id: number) {
    if (!confirm('Delete this product?')) return;
    this.api.deleteProduct(id).subscribe(() => this.loadProducts());
  }
}