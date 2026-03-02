using InventoryApi.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;


public class InvoiceItem
{
    public int Id { get; set; }

    public int InvoiceId { get; set; }
    public int ProductId { get; set; }

    public int Quantity { get; set; }
    public decimal Price { get; set; }

    [ValidateNever]
    public Invoice Invoice { get; set; }

    [ValidateNever]          
    public Product Product { get; set; }
}