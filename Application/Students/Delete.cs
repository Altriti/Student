using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Students
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser>_userManager;
            public Handler(DataContext context, UserManager<AppUser> userManager)
            {
                _userManager = userManager;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var student = await _context.Students.Include(x => x.AppUser).SingleOrDefaultAsync(x => x.Id == request.Id);//qitu a me bo kur ta delete ni student mu delete edhe si user?????

                // if (student == null) return null;
 
                student.AppUser.IsConfirmed = false;

                _context.Remove(student);//throws exception nese ska student, qata sna duhet rreshti ma nalt

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete the student");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}