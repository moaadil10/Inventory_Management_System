using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using InventoryApi.Data;

[Authorize(Roles = "Admin")]
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly PasswordHasher<User> _hasher = new();

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    // 🔹 GET ALL USERS
    [HttpGet]
    public IActionResult GetUsers()
    {
        return Ok(_context.Users.Select(u => new {
            u.Id,
            u.Username,
            u.Role
        }));
    }

    // 🔹 ADD USER
    [HttpPost]
    public IActionResult AddUser(UserDto dto)
    {
        var user = new User
        {
            Username = dto.Username,
            Role = dto.Role
        };

        user.PasswordHash = _hasher.HashPassword(user, dto.Password);

        _context.Users.Add(user);
        _context.SaveChanges();

        return Ok();
    }

    // 🔹 UPDATE USER ROLE OR PASSWORD
    [HttpPut("{id}")]
    public IActionResult UpdateUser(int id, UserDto dto)
    {
        var user = _context.Users.Find(id);
        if (user == null) return NotFound();

        user.Role = dto.Role;

        if (!string.IsNullOrEmpty(dto.Password))
        {
            user.PasswordHash = _hasher.HashPassword(user, dto.Password);
        }

        _context.SaveChanges();
        return Ok();
    }

    // 🔹 DELETE USER
    [HttpDelete("{id}")]
    public IActionResult DeleteUser(int id)
    {
        var user = _context.Users.Find(id);
        if (user == null) return NotFound();

        _context.Users.Remove(user);
        _context.SaveChanges();
        return Ok();
    }
}