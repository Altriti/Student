using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Students
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Student Student { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Student).SetValidator(new StudentValidator());
            }
        }


        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly UserManager<AppUser> _userManager;
            public Handler(DataContext context, IMapper mapper, UserManager<AppUser> userManager)
            {
                _userManager = userManager;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // _context.ChangeTracker.Clear();
                // var student = await _context.Students.FindAsync(request.Student.Id);//ruan te var student studentin nga context qe e ka id e njejt me studentin ne request
                var student = await _context.Students.Include(x => x.AppUser).SingleOrDefaultAsync(x => x.Id == request.Student.Id);
                // var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == request.Student.AppUser.Id);

                if (student == null) return null;//nese ska, Result ka me kon null qe kthen notFound

                _mapper.Map(request.Student, student);
                //student i domain po ndrrohet me student qe eshte request i cili po ruhet.

                // student.Name = request.Student.Name;
                // student.Surname = request.Student.Surname;
                // student.AppUser =user;

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update student");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}