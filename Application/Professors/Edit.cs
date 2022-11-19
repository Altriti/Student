using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Professors
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Professor Professor { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Professor).SetValidator(new ProfessorValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var professor = await _context.Professors.Include(x => x.AppUser).SingleOrDefaultAsync(x => x.Id == request.Professor.Id);

                if (professor == null) return null;

                _mapper.Map(request.Professor, professor);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update professor");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}