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
    public class List
    {
        public class Query : IRequest<Result<List<Timetable>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Timetable>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Timetable>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var timetables = await _context.Timetables
                .Include(x => x.Class)
                .Include(x => x.WeekDaySchedules)
                .ThenInclude(x => x.Schedules)
                .ThenInclude(x => x.Subject)
                .ToListAsync();

                return Result<List<Timetable>>.Success(timetables);
            }
        }
    }
}