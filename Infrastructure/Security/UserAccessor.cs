using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Security
{
    // public class UserAccessor : IUserAccessor
    // {
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetUsername()
        {
            return _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
        }
    }

    // private readonly UserManager<AppUser> _userManager;

    // public UserAccessor(UserManager<AppUser> userManager)
    // {
    //     _userManager = userManager;
    // }

    // public string GetId()
    // {
    //     // return _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
    //     return _userManager.Users.
    // }
}
// }