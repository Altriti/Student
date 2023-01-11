using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.StudentGrades
{
    public class Details
    {
        public class Query : IRequest<Result<GradeSubjectDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<GradeSubjectDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<GradeSubjectDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var grade = await _context.Grades
                .ProjectTo<GradeSubjectDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

                if (grade == null) return null;

                return Result<GradeSubjectDto>.Success(grade);
            }
        }
    }
}