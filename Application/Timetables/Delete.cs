using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Timetables
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
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
                var timetable = await _context.Timetables
                .Include(x => x.WeekDaySchedules)
                .ThenInclude(x => x.Schedules)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

                if (timetable == null) return null;

                _context.Remove(timetable);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete timetable");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}