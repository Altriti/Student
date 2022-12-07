using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Subjects
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Subject Subject { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Subject).SetValidator(new SubjectValidator());
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
                var subject = await _context.Subjects.FindAsync(request.Subject.Id);

                if (subject == null) return null;

                _mapper.Map(request.Subject, subject);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update subject");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}