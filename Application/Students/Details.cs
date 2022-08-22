using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Students
{
    public class Details
    {
        public class Query : IRequest<Student>
        {
            public Guid Id { get; set; }
        }


        public class Handler : IRequestHandler<Query, Student>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Student> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Students.FindAsync(request.Id);
            }
        }
    }


}