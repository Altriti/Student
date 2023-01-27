using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Timetables
{
    public class Details
    {
        public class Query : IRequest<Result<Timetable>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Timetable>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Timetable>> Handle(Query request, CancellationToken cancellationToken)
            {
                var timetable = await _context.Timetables
                .Include(x => x.Class)
                .Include(x => x.WeekDaySchedules)
                .ThenInclude(x => x.Schedules)
                .ThenInclude(x => x.Subject)
                .FirstOrDefaultAsync(x => x.Id == request.Id);


                return Result<Timetable>.Success(timetable);
            }
        }
    }
}