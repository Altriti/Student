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
        public ICollection<Student> Students { get; set; }
        public ICollection<Profile> Professors { get; set; }
        public ICollection<SubjectDto.SubjectDto> Subjects { get; set; }
    }
}