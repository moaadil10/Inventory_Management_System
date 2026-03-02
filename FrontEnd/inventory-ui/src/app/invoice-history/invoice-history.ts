import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-invoice-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice-history.html'
})
export class InvoiceHistoryComponent implements OnInit {

  invoices: any[] = [];
  filteredInvoices: any[] = [];
  paginatedInvoices: any[] = [];

  loading = true;

  // ⭐ Filters
  searchText = '';
  selectedDate = '';
  showCancelled = true;

  // pagination
  page = 1;
  pageSize = 5;

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  // ================= LOAD =================
  loadInvoices() {
    this.loading = true;

    this.api.getInvoices().subscribe({
      next: data => {
        this.invoices = data;
        this.applyFilters();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => this.loading = false
    });
  }

  // ================= FILTERS =================
  applyFilters() {
    this.filteredInvoices = this.invoices.filter(inv => {

      const matchSearch =
        this.searchText === '' ||
        inv.customerName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        inv.items?.some((i: any) =>
          i.productName.toLowerCase().includes(this.searchText.toLowerCase())
        );

      const matchDate =
        this.selectedDate === '' ||
        inv.date.startsWith(this.selectedDate);

      const matchCancelled =
        this.showCancelled ? true : !inv.isCancelled;

      return matchSearch && matchDate && matchCancelled;
    });

    this.page = 1;
    this.applyPagination();
  }

  // ================= PAGINATION =================
  applyPagination() {
    const start = (this.page - 1) * this.pageSize;
    this.paginatedInvoices =
      this.filteredInvoices.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.page * this.pageSize < this.filteredInvoices.length) {
      this.page++;
      this.applyPagination();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.applyPagination();
    }
  }

  // ================= PRINT =================
  printInvoice(inv: any) {
    const itemsHtml = inv.items?.length
      ? inv.items.map((i: any) =>
        `<tr>
            <td>${i.productName}</td>
            <td>${i.quantity}</td>
            <td>₹${i.price}</td>
            <td>₹${i.quantity * i.price}</td>
          </tr>`).join('')
      : `<tr><td colspan="4">No items</td></tr>`;

    const html = `
      <h2>Invoice</h2>
      <p><strong>ID:</strong> ${inv.id}</p>
      <p><strong>Date:</strong> ${new Date(inv.date).toLocaleString()}</p>
      <p><strong>Customer:</strong> ${inv.customerName}</p>

      <table border="1" cellspacing="0" cellpadding="5">
        <tr>
          <th>Product</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
        ${itemsHtml}
      </table>

      <h3>Total: ₹${inv.total}</h3>
    `;

    const w = window.open('', '_blank');
    w!.document.write(html);
    w!.print();
  }

  // ================= PDF =================
  exportPDF(inv: any) {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(25, 118, 210);
    doc.rect(0, 0, 210, 25, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text('INVOICE', 85, 15);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Invoice ID: ${inv.id}`, 14, 35);
    doc.text(`Customer: ${inv.customerName}`, 14, 45);
    doc.text(`Date: ${new Date(inv.date).toLocaleString()}`, 14, 55);

    let y = 65;

    if (inv.items?.length) {
      const rows = inv.items.map((i: any) => [
        i.productName,
        i.quantity,
        `₹${i.price}`,
        `₹${i.quantity * i.price}`
      ]);

      autoTable(doc, {
        startY: y,
        head: [['Product', 'Qty', 'Price', 'Total']],
        body: rows,
        theme: 'grid',
        headStyles: { fillColor: [25, 118, 210] }
      });

      y = (doc as any).lastAutoTable.finalY + 10;
    }

    doc.setFontSize(14);
    doc.text(`Total Amount: ₹${inv.total}`, 14, y);

    doc.save(`Invoice-${inv.id}.pdf`);
  }

  // ================= EMAIL =================
  emailInvoice(inv: any) {
    const subject = `Invoice #${inv.id}`;
    const body = `
Invoice Details
---------------
Customer: ${inv.customerName}
Date: ${new Date(inv.date).toLocaleString()}
Total: ₹${inv.total}
`;

    window.location.href =
      `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  // ================= CSV =================
  exportCSV() {
    const rows = this.filteredInvoices.map(i => ({
      ID: i.id,
      Date: new Date(i.date).toLocaleString(),
      Customer: i.customerName,
      Total: i.total,
      Status: i.isCancelled ? 'Cancelled' : 'Active'
    }));

    const csv =
      Object.keys(rows[0]).join(',') + '\n' +
      rows.map(r => Object.values(r).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'invoices.csv';
    a.click();
  }

  // ================= CANCEL =================
  cancelInvoice(id: number) {
    if (!confirm('Cancel this invoice?')) return;

    this.api.cancelInvoice(id).subscribe(() => {
      this.loadInvoices();
    });
  }
}