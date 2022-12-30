using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Classes
{
    public class RegisterSubject
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid ClassId { get; set; }
            public String SubjectId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var classR = await _context.Classes.FindAsync(request.ClassId);

                var subject = await _context.Subjects.FindAsync(request.SubjectId);

                var classSubject = new ClassSubject
                {
                    Class = classR,
                    Subject = subject
                };

                _context.ClassSubjects.Add(classSubject);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to add subject");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}