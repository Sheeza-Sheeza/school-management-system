using Microsoft.EntityFrameworkCore;
using SchoolManagementSystem.API.Models;

namespace SchoolManagementSystem.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        { }

        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<ClassLecture> ClassLectures { get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }
    }
}
