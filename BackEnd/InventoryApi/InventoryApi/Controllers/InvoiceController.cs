using InventoryApi.Data;
using InventoryApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class InvoiceController : ControllerBase
{
    private readonly AppDbContext _context;

    public InvoiceController(AppDbContext context)
    {
        _context = context;
    }

    // ================================
    // GET: api/Invoice
    // ================================
    [HttpGet]
    public IActionResult GetInvoices()
    {
        var invoices = _context.Invoices
            .Include(i => i.Customer)
            .Include(i => i.Items)
                .ThenInclude(ii => ii.Product)
            .Select(i => new
            {
                i.Id,
                i.Date,
                i.Total,
                isCancelled = i.IsCancelled,
                CustomerName = i.Customer.Name,
                Items = i.Items.Select(x => new
                {
                    ProductName = x.Product.Name,
                    x.Quantity,
                    x.Price
                })
            })
            .OrderByDescending(i => i.Date)
            .ToList();

        return Ok(invoices);
    }

    // ================================
    // POST: api/Invoice
    // ================================
    [HttpPost]
    public IActionResult CreateInvoice([FromBody] Invoice invoice)
    {
        if (invoice == null || invoice.Items == null || !invoice.Items.Any())
            return BadRequest("Invoice must contain items");

        // ❗ Validate items
        foreach (var item in invoice.Items)
        {
            if (item.ProductId <= 0)
                return BadRequest("Invalid product selected");

            if (item.Quantity <= 0)
                return BadRequest("Invalid quantity");

            var product = _context.Products.FirstOrDefault(p => p.Id == item.ProductId);

            if (product == null)
                return BadRequest($"Product not found (ID: {item.ProductId})");

            if (product.Stock < item.Quantity)
                return BadRequest($"Not enough stock for {product.Name}");

            // ⭐ Set price from product to prevent tampering
            item.Price = product.Price;

            // ⭐ Reduce stock
            product.Stock -= item.Quantity;
        }

        // ⭐ Calculate total
        invoice.Total = invoice.Items.Sum(i => i.Price * i.Quantity);
        invoice.Date = DateTime.Now;

        _context.Invoices.Add(invoice);
        _context.SaveChanges();

        return Ok(new
        {
            message = "Invoice saved successfully",
            id = invoice.Id
        });
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("cancel/{id}")]
    public IActionResult CancelInvoice(int id)
    {
        var invoice = _context.Invoices
            .Include(i => i.Items)
            .FirstOrDefault(i => i.Id == id);

        if (invoice == null)
            return NotFound("Invoice not found");

        if (invoice.IsCancelled)
            return BadRequest("Invoice already cancelled");

        // ✅ Restore stock
        foreach (var item in invoice.Items)
        {
            var product = _context.Products.FirstOrDefault(p => p.Id == item.ProductId);
            if (product != null)
                product.Stock += item.Quantity;
        }

        invoice.IsCancelled = true;
        _context.SaveChanges();

        return Ok(new { message = "Invoice cancelled successfully" });
    }
}