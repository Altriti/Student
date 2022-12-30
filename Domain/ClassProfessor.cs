using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class ClassProfessor
    {
        public Guid ClassId { get; set; }
        public Class Class { get; set; }
        public Guid ProfessorId { get; set; }
        public Professor Professor { get; set; }
    }
}