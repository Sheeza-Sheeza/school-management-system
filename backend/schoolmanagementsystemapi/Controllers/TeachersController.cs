using Microsoft.AspNetCore.Mvc;
using SchoolManagementSystem.API.Data;
using SchoolManagementSystem.API.Models;

namespace SchoolManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeachersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TeachersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetTeachers()
        {
            var teachers = _context.Teachers.ToList();
            return Ok(teachers);
        }

        [HttpPost]
        public IActionResult AddTeacher([FromBody] Teacher teacher)
        {
            _context.Teachers.Add(teacher);
            _context.SaveChanges();
            return Ok(teacher);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTeacher(int id)
        {
            var teacher = _context.Teachers.Find(id);
            if (teacher == null) return NotFound();
            _context.Teachers.Remove(teacher);
            _context.SaveChanges();
            return Ok();
        }

        // ✅ NEW: Update teacher name by ID
        [HttpPut("{id}")]
public IActionResult UpdateTeacher(int id, [FromBody] Teacher updatedTeacher)
{
    var existingTeacher = _context.Teachers.Find(id);
    if (existingTeacher == null)
        return NotFound();

    existingTeacher.Name = updatedTeacher.Name;
    _context.SaveChanges();

    return Ok(existingTeacher);
  }

    }
}
