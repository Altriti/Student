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
                var student = await _context.Students.Include(x => x.AppUser).FirstOrDefaultAsync(x => x.Id == request.Id);
                // var student = await _context.Students.Include(x => x.AppUser).FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<Student>.Success(student);
            }
        }
    }


}