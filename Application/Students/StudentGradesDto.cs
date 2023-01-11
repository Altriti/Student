using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Students
{
    public class StudentGradesDto
    {
        public SubjectDto.SubjectDto Subject { get; set; }
        public int Grade { get; set; }
        public bool MainGrade { get; set; }
    }
}