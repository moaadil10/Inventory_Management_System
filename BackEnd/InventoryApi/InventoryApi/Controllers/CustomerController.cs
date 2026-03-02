using InventoryApi.Data;
using InventoryApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InventoryApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CustomerController : ControllerBase
{
    private readonly AppDbContext _context;

    public CustomerController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetCustomers()
    {
        return Ok(_context.Customers.ToList());
    }
    [Authorize(Roles = "Admin,User")]
    [HttpPost]
    public IActionResult AddCustomer(Customer customer)
    {
        _context.Customers.Add(customer);
        _context.SaveChanges();
        return Ok(customer);
    }
    [Authorize(Roles = "Admin,User")]
    [HttpPut("{id}")]
    public IActionResult UpdateCustomer(int id, Customer customer)
    {
        var existing = _context.Customers.Find(id);
        if (existing == null) return NotFound();

        existing.Name = customer.Name;
        existing.Phone = customer.Phone;

        _context.SaveChanges();
        return Ok(existing);
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public IActionResult DeleteCustomer(int id)
    {
        var customer = _context.Customers.Find(id);
        if (customer == null) return NotFound();

        bool hasInvoices = _context.Invoices.Any(i => i.CustomerId == id);
        if (hasInvoices)
            return BadRequest("Cannot delete customer with invoices.");

        _context.Customers.Remove(customer);
        _context.SaveChanges();
        return Ok();
    }
}