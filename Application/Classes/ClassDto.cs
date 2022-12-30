using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles;
using Domain;

namespace Application.Classes
{
    public class ClassDto
    {
        public Guid Id { get; set; }
        public String ClassName { get; set; }
        public Professor ClassProfessor { get; set; }
        public List<Student> Students { get; set; } = new List<Student>();
        public ICollection<Profile> Professors { get; set; }
        public ICollection<SubjectDto> Subjects { get; set; }
    }
}