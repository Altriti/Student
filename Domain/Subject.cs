using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Subject
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public ICollection<ClassSubject> Classes { get; set; }
        public ICollection<GradeSubject> Grades { get; set; }
    }
}