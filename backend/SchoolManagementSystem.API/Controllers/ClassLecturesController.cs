using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolManagementSystem.API.Data;
using SchoolManagementSystem.API.Models;

namespace SchoolManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassLecturesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ClassLecturesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetClassLectures()
        {
            var lectures = _context.ClassLectures
                .Include(cl => cl.Teacher)
                .Include(cl => cl.Subject)
                .ToList();

            return Ok(lectures);
        }

        [HttpPost]
        public IActionResult CreateClassLecture([FromBody] ClassLectureDto dto)
        {
            var teacher = _context.Teachers.Find(dto.TeacherId);
            var subject = _context.Subjects.Find(dto.SubjectId);

            if (teacher == null || subject == null)
                return BadRequest("Invalid Teacher or Subject");

            var classLecture = new ClassLecture
            {
                Teacher = teacher,
                Subject = subject
            };

            _context.ClassLectures.Add(classLecture);
            _context.SaveChanges();

            return Ok(classLecture);
        }
    }
}
