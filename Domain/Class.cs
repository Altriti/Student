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
        public ICollection<Student> Students { get; set; }
        public ICollection<ClassProfessor> Professors { get; set; }
        public ICollection<ClassSubject> Subjects { get; set; }
    }
}