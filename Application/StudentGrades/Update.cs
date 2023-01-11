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

namespace Application.StudentGrades
{
    public class Update
    {
        public class Command : IRequest<Result<Unit>>
        {
            public GradeSubject Grade { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Grade).SetValidator(new GradeValidator());
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
                var grade = await _context.Grades.FindAsync(request.Grade.Id);

                if (grade == null) return null;

                _mapper.Map(request.Grade, grade);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update grade");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}