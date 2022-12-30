using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Classes
{
    public class List
    {
        public class Query : IRequest<Result<List<ClassDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ClassDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<ClassDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var classes = await _context.Classes
                    .ProjectTo<ClassDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<ClassDto>>.Success(classes);
            }
        }
    }
}