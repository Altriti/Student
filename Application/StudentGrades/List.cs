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

namespace Application.StudentGrades
{
    public class List
    {
        public class Query : IRequest<Result<List<GradeSubjectDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<GradeSubjectDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<GradeSubjectDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var grades = await _context.Grades
                .Include(x => x.Student)
                .Include(x => x.Subject)
                .ToListAsync(cancellationToken);

                var gradesToReturn = _mapper.Map<List<GradeSubjectDto>>(grades);
                return Result<List<GradeSubjectDto>>.Success(gradesToReturn);
            }
        }
    }
}