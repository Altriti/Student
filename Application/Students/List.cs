using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Students
{
    public class List
    {
        public class Query : IRequest<Result<List<Student>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Student>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Student>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // return Result<List<Student>>.Success(await _context.Students.ToListAsync(cancellationToken));
                // return Result<List<Student>>.Success(await _context.Students.Include(x => x.AppUser).Where(x=> x.AppUser.Id==x.Id.ToString()).ToListAsync(cancellationToken));
                return Result<List<Student>>.Success(await _context.Students.Include(x => x.AppUser).ToListAsync(cancellationToken));
            }
        }
    }
}