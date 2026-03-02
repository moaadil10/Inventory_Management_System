import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  stats: any = {};

  // ⭐ keep chart references to destroy later
  revenueChart: any;
  invoiceChart: any;
  lowStockChart: any;

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  // ================= LOAD DATA =================
  loadDashboard() {
    this.api.getDashboard().subscribe({
      next: data => {
        this.stats = data;

        // ⭐ Force DOM update so canvas exists
        this.cdr.detectChanges();

        // ⭐ Render charts after DOM ready
        setTimeout(() => this.renderCharts(), 0);
      }
    });
  }

  // ================= RENDER CHARTS =================
  renderCharts() {
    this.destroyCharts(); // prevent duplicates

    // 📊 Revenue Chart
    const revenueCanvas = document.getElementById('revenueChart') as HTMLCanvasElement;
    if (revenueCanvas) {
      this.revenueChart = new Chart(revenueCanvas, {
        type: 'bar',
        data: {
          labels: ['Total Revenue'],
          datasets: [{
            label: 'Revenue',
            data: [this.stats.totalRevenue]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }

    // 📊 Invoice Chart
    const invoiceCanvas = document.getElementById('invoiceChart') as HTMLCanvasElement;
    if (invoiceCanvas) {
      this.invoiceChart = new Chart(invoiceCanvas, {
        type: 'doughnut',
        data: {
          labels: ['Invoices'],
          datasets: [{
            data: [this.stats.totalInvoices]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }

    // 📊 Low Stock Chart
    const lowStockCanvas = document.getElementById('lowStockChart') as HTMLCanvasElement;
    if (lowStockCanvas && this.stats.lowStock?.length) {
      this.lowStockChart = new Chart(lowStockCanvas, {
        type: 'bar',
        data: {
          labels: this.stats.lowStock.map((p: any) => p.name),
          datasets: [{
            label: 'Stock Remaining',
            data: this.stats.lowStock.map((p: any) => p.stock)
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  }

  // ================= CLEANUP =================
  destroyCharts() {
    this.revenueChart?.destroy();
    this.invoiceChart?.destroy();
    this.lowStockChart?.destroy();
  }

  ngOnDestroy(): void {
    this.destroyCharts();
  }
}