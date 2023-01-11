using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles;
using Domain;

namespace Application.StudentGrades
{
    public class GradeSubjectDto
    {
        public Guid Id { get; set; }
        public Guid StudentId { get; set; }
        public Profile Student { get; set; }
        public string SubjectId { get; set; }
        public SubjectDto.SubjectDto Subject { get; set; }
        public int Grade { get; set; }
        public bool MainGrade { get; set; }
    }
}