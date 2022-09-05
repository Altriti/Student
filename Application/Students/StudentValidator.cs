using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Students
{
    public class StudentValidator : AbstractValidator<Student>
    {
        public StudentValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Surname).NotEmpty();
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.PhoneNumber).NotEmpty();
            RuleFor(x => x.Street).NotEmpty();
            RuleFor(x => x.City).NotEmpty();
            RuleFor(x => x.State).NotEmpty();
            RuleFor(x => x.Gender).NotEmpty();
            RuleFor(x => x.Nationality).NotEmpty();
            RuleFor(x => x.ParentName).NotEmpty();
            RuleFor(x => x.ParentEmail).NotEmpty();
            RuleFor(x => x.ParentPhoneNumber).NotEmpty();
            RuleFor(x => x.ParentStreet).NotEmpty();
            RuleFor(x => x.ParentCity).NotEmpty();
            RuleFor(x => x.ParentState).NotEmpty();
        }
    }
}