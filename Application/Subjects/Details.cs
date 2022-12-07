using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Subjects
{
    public class Details
    {
        public class Query : IRequest<Result<Subject>>
        {
            public string Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<Subject>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Subject>> Handle(Query request, CancellationToken cancellationToken)
            {
                var subject = await _context.Subjects.FindAsync(request.Id);

                return Result<Subject>.Success(subject);
            }
        }
    }
}