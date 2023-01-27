using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Timetables
{
    public class Update
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Timetable Timetable { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                var timetable = await _context.Timetables
                .Include(x => x.Class)
                .Include(x => x.WeekDaySchedules)
                .ThenInclude(x => x.Schedules)
                .ThenInclude(x => x.Subject)
                .FirstOrDefaultAsync(x => x.Id == request.Timetable.Id);

                if (timetable == null) return null;

                var timetableDto = _mapper.Map<TimetableDto>(request.Timetable);
                _mapper.Map(timetableDto, timetable);
                // _mapper.Map(timetableDto, timetable);
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update timetable");

                // var utb = await _context.Timetables.FirstOrDefaultAsync(x => x.Id == request.Timetable.Id);

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}