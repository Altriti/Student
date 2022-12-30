using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Classes
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Class Class { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Class).SetValidator(new ClassValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = _context.Users.FirstOrDefault(x => x.UserName == _userAccessor.GetUsername());

                var CProfessor = _context.Professors.FirstOrDefault(x => x.AppUserId == user.Id);

                var classR = new Class
                {
                    ClassName = request.Class.ClassName,
                    ClassProfessor = CProfessor
                };

                _context.Classes.Add(classR);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create Class");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}