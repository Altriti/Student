using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Class
    {
        public Guid Id { get; set; }
        public String ClassName { get; set; }
        public Professor ClassProfessor { get; set; }
        public List<Student> Students { get; set; } = new List<Student>();
        public List<Professor> Professors { get; set; } = new List<Professor>();
        public List<Subject> Subjects { get; set; } = new List<Subject>();
    }
}