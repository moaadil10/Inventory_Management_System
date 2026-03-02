using InventoryApi.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

public class Invoice
{
    public int Id { get; set; }

    public DateTime Date { get; set; }

    public int CustomerId { get; set; }

    public decimal Total { get; set; }  

    [ValidateNever]
    public Customer Customer { get; set; }

    public bool IsCancelled { get; set; } = false;  


    public ICollection<InvoiceItem> Items { get; set; } = new List<InvoiceItem>();
}