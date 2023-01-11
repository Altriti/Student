using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.StudentGrades
{
    public class GradeValidator : AbstractValidator<GradeSubject>
    {
        public GradeValidator()
        {
            RuleFor(x => x.StudentId).NotEmpty();
            RuleFor(x => x.SubjectId).NotEmpty();
            RuleFor(x => x.Grade).NotEmpty();
            RuleFor(x => x.MainGrade).NotEmpty();
        }
    }
}