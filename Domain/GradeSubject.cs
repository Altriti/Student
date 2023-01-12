using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class GradeSubject
    {
        public Guid Id { get; set; }
        public Guid StudentId { get; set; }
        public virtual Student Student { get; set; }
        public string SubjectId { get; set; }
        public virtual Subject Subject { get; set; }
        public int Grade { get; set; }
        public bool MainGrade { get; set; }
        public Professor Professor { get; set; }
    }
}