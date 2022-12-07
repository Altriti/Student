using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Subjects
{
    public class List
    {
        public class Query : IRequest<Result<List<Subject>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Subject>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Subject>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Subject>>.Success(await _context.Subjects.ToListAsync());
            }
        }
    }
}