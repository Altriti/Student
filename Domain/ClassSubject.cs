using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class ClassSubject
    {
        public Guid ClassId { get; set; }
        public Class Class { get; set; }
        public string SubjectId { get; set; }
        public Subject Subject { get; set; }
    }
}