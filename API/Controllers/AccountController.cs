using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        private readonly DataContext _context;
        private readonly RoleManager<IdentityRole> _roleManager;
        public AccountController(UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager, TokenService tokenService, DataContext context, RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
            _context = context;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);//_userManager contains users

            if (user == null) return Unauthorized();//nese user=null, i bjen qe FindByEmail nuk mundet me gjet emailen pasiqe nuk ekziston

            if (user.IsConfirmed)
            {

                var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);//checkPass... takes 3 params: the user, the password and what to do in case of failure

                if (result.Succeeded)
                {
                    return CreateUserObject(user);
                }
            }

            return Unauthorized();//bad password
        }


        [HttpPost("register")]//register duhet me hek se ni user ska me mujt mu bo register vet, veq ni admin ka me bo register
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "This email is taken");//this adds an error manualy
                return ValidationProblem();
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Username
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return BadRequest("Problem registering user");
        }


        [HttpPut("{id}")]
        public async Task<Result<Unit>> ConfirmStatus(String id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null) return Result<Unit>.Failure("Couldn't find user with the given id");

            user.IsConfirmed = true;

            var student = _context.Students.FirstOrDefault(x => x.AppUserId == id);

            if (student == null) return Result<Unit>.Failure("Student is not active");

            student.IsConfirmed = true;

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<Unit>.Failure("User is already confirmed");

            return Result<Unit>.Success(Unit.Value);
        }


        [HttpGet("users")]
        public Task<List<AppUser>> GetUsers()
        {
            return  _context.Users.ToListAsync();
        }


        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);
        }

        private UserDto CreateUserObject(AppUser user)//per mos me perserit shum, e krijojm ni metode edhe i zevendsojm LOOK AT REFERENCES
        {
            // var role = _context.UserRoles.FirstOrDefault(x => x.RoleId.Where(x.UserId == user.Id))
            var roleU = _context.UserRoles.FirstOrDefault(x => x.UserId==user.Id);
            var role = _roleManager.Roles.FirstOrDefault(x => x.Id == roleU.RoleId);
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Image = null,
                Token = _tokenService.CreateToken(user),
                Username = user.UserName,
                Role = role.Name
            };
        }
    }
}