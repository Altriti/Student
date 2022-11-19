using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Professors
{
    public class List
    {
        public class Query : IRequest<Result<List<Professor>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Professor>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Professor>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Professor>>.Success(await _context.Professors.Include(x => x.AppUser).ToListAsync(cancellationToken));
            }
        }
    }
}