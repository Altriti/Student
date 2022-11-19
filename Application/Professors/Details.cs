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
    public class Details
    {
        public class Query : IRequest<Result<Professor>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Professor>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Professor>> Handle(Query request, CancellationToken cancellationToken)
            {
                var professor = await _context.Professors.Include(x => x.AppUser).FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<Professor>.Success(professor);
            }
        }
    }
}