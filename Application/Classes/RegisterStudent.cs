using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Classes
{
    public class RegisterStudent
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid ClassId { get; set; }
            public Guid StudentId { get; set; }
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
                var classR = await _context.Classes.FirstOrDefaultAsync(x => x.Id == request.ClassId);

                var student = await _context.Students.FirstOrDefaultAsync(x => x.Id == request.StudentId);

                // if (student == null) return null;

                classR.Students.Add(student);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to add Student to class");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}