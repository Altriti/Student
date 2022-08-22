using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Students
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Student Student { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var student = await _context.Students.FindAsync(request.Student.Id);

                _mapper.Map(request.Student, student);  

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}