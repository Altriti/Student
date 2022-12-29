using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Classes
{
    public class List
    {
        public class Query : IRequest<Result<List<Class>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Class>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Class>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Class>>.Success(await _context.Classes
                .Include(x => x.ClassProfessor)
                .Include(x => x.Students)
                .Include(x => x.Professors)
                .Include(x => x.Subjects)
                .ToListAsync());
            }
        }
    }
}