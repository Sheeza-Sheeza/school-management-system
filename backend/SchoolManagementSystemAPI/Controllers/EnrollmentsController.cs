using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolManagementSystem.API.Data;
using SchoolManagementSystem.API.Models;

namespace SchoolManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnrollmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EnrollmentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetEnrollments()
        {
            var enrollments = _context.Enrollments
                .Include(e => e.Student)
                .Include(e => e.ClassLecture)
                    .ThenInclude(cl => cl.Teacher)
                .Include(e => e.ClassLecture)
                    .ThenInclude(cl => cl.Subject)
                .ToList();

            return Ok(enrollments);
        }

        [HttpPost]
        public IActionResult EnrollStudent([FromBody] EnrollmentDto dto)
        {
            var student = _context.Students.Find(dto.StudentId);
            var classLecture = _context.ClassLectures.Find(dto.ClassLectureId);

            if (student == null || classLecture == null)
                return BadRequest("Invalid Student or Class Lecture");

            var enrollment = new Enrollment
            {
                Student = student,
                ClassLecture = classLecture
            };

            _context.Enrollments.Add(enrollment);
            _context.SaveChanges();

            return Ok(enrollment);
        }
    }
}
