namespace SchoolManagementSystem.API.Models
{
    public class Enrollment
    {
        public int Id { get; set; }

        public int StudentId { get; set; }
        public Student? Student { get; set; }

        public int ClassLectureId { get; set; }
        public ClassLecture? ClassLecture { get; set; }
    }
}
