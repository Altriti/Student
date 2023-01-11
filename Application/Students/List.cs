using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Students
{
    public class List
    {
        public class Query : IRequest<Result<List<StudentDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<StudentDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<StudentDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var students = await _context.Students
                    .Include(x => x.AppUser)
                    .Include(x => x.Grade)
                    .ThenInclude(x => x.Subject)
                    .ToListAsync(cancellationToken);

                var studentsToReturn = _mapper.Map<List<StudentDto>>(students);

                return Result<List<StudentDto>>.Success(studentsToReturn);
            }
        }
    }
}