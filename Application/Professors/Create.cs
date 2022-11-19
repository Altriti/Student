using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Professors
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Professor Professor { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Professor).SetValidator(new ProfessorValidator());
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
                // _context.Professors.Add(request.Professor);
                string PCreds = request.Professor.Name + "." + request.Professor.Surname;
                string appD = "@student.com";
                string PUEmail = PCreds.ToLower().ToString() + appD;

                var user = new AppUser
                {
                    DisplayName = request.Professor.Name,
                    Email = PUEmail,
                    UserName = request.Professor.Email,
                    IsConfirmed = true
                };

                var professor = new Professor
                {
                    Name = request.Professor.Name,
                    Surname = request.Professor.Surname,
                    Email = request.Professor.Email,
                    PhoneNumber = request.Professor.PhoneNumber,
                    Street = request.Professor.Street,
                    City = request.Professor.City,
                    State = request.Professor.State,
                    Gender = request.Professor.Gender,
                    Nationality = request.Professor.Nationality,
                    AppUserId = user.Id,
                };

                await _userManager.CreateAsync(user, "Pa$$w0rd");
                await _userManager.AddToRoleAsync(user, "Professor");

                
                _context.Add(professor);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Couldn't save professor");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}