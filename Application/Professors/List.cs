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

namespace Application.Professors
{
    public class List
    {
        public class Query : IRequest<Result<List<ProfessorDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ProfessorDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<ProfessorDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var professors = await _context.Professors
                    .Include(x => x.AppUser)
                    .Include(x => x.Classes)
                    .ToListAsync(cancellationToken);

                var mappedProfessors = _mapper.Map<List<ProfessorDto>>(professors);

                return Result<List<ProfessorDto>>.Success(mappedProfessors);
            }
        }
    }
}