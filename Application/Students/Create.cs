using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Students
{
    public class Create : ControllerBase
    {
        // private readonly UserManager<AppUser> _userManager;
        public class Command : IRequest<Result<Unit>>//unit i bjen qe sjem tu kthy data, returns void
        {
            public Student Student { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Student).SetValidator(new StudentValidator());//rulefor - rule chains for properties
            }
        }


        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            public Handler(DataContext context, UserManager<AppUser> userManager)
            {
                _userManager = userManager;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                //var user = await _context.Users.FindAsync(request.Student.AppUserId);

                // _context.Students.Add(request.Student);

                string UEmail = (request.Student.Name[0].ToString()
                    + request.Student.Surname[0].ToString()
                    + request.Student.Id.ToString().Substring(0, 3))
                    .ToLower()
                    + "@student.com";


                if (await _userManager.Users.AnyAsync(u => u.NormalizedEmail == UEmail.ToUpper()))
                {
                    return Result<Unit>.Failure("You go play lottery, you will win 100%");
                }
                else
                {

                    var user = new AppUser
                    {
                        DisplayName = request.Student.Name,
                        Email = UEmail,
                        UserName = request.Student.Email,
                        IsConfirmed = false
                        // PasswordHash = "123"
                    };


                    var student = new Student
                    {
                        Name = request.Student.Name,
                        Surname = request.Student.Surname,
                        Email = request.Student.Email,
                        PhoneNumber = request.Student.PhoneNumber,
                        Street = request.Student.Street,
                        City = request.Student.City,
                        State = request.Student.State,
                        Gender = request.Student.Gender,
                        Nationality = request.Student.Nationality,
                        ParentName = request.Student.ParentName,
                        ParentEmail = request.Student.ParentEmail,
                        ParentPhoneNumber = request.Student.ParentPhoneNumber,
                        ParentStreet = request.Student.ParentStreet,
                        ParentCity = request.Student.ParentCity,
                        ParentState = request.Student.ParentState,
                        IsConfirmed = false,
                        AppUserId = user.Id
                    };



                    await _userManager.CreateAsync(user, "Pa$$w0rd"); //qitu mas qetij rreshtu mos duhet edhe ni savechanges????
                    await _userManager.AddToRoleAsync(user, "Student");
                    // _context.Users.Add(user);
                    // await _context.SaveChangesAsync();

                    _context.Students.Add(student);
                    //string id=studentuser.Id.ToString();

                    var result = await _context.SaveChangesAsync() > 0; //SaveChangesAsync return a integer

                    if (!result) return Result<Unit>.Failure("Failed to create Student");//this is unneccesary tybe amo perqdo rast

                    return Result<Unit>.Success(Unit.Value);
                }
            }
        }


    }
}