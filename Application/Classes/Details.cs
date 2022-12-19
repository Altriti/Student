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
    public class Details
    {
        public class Query : IRequest<Result<Class>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Class>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Class>> Handle(Query request, CancellationToken cancellationToken)
            {
                var classR = await _context.Classes
                .Include(x => x.ClassProfessor)
                .ThenInclude(x => x.AppUser)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<Class>.Success(classR);
            }
        }
    }
}