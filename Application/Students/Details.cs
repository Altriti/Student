using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Students
{
    public class Details
    {
        public class Query : IRequest<Result<Student>>
        {
            public Guid Id { get; set; }
        }


        public class Handler : IRequestHandler<Query, Result<Student>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Student>> Handle(Query request, CancellationToken cancellationToken)
            {
                var student = await _context.Students.FindAsync(request.Id);

                return Result<Student>.Success(student);
            }
        }
    }


}