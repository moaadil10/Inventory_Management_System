using Microsoft.AspNetCore.Mvc;
using InventoryApi.Data;

[Route("api/[controller]")]
[ApiController]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _context;

    public DashboardController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetDashboard()
    {
        var totalInvoices = _context.Invoices.Count();
        var totalRevenue = _context.Invoices.Sum(i => (decimal?)i.Total) ?? 0;
        var totalProducts = _context.Products.Count();

        var lowStock = _context.Products
            .Where(p => p.Stock < 5)
            .Select(p => new
            {
                p.Name,
                p.Stock
            })
            .ToList();

        return Ok(new
        {
            totalInvoices,
            totalRevenue,
            totalProducts,
            lowStock
        });
    }
}