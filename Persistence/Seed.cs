using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            if (!roleManager.RoleExistsAsync("Administrator").Result)
            {
                var role = new IdentityRole
                {
                    Name = "Administrator"
                };
                await roleManager.CreateAsync(role);
            }

            if (!roleManager.RoleExistsAsync("Student").Result)
            {
                var role = new IdentityRole
                {
                    Name = "Student"
                };
                await roleManager.CreateAsync(role);
            }




            if (!userManager.Users.Any())
            {//ne ska asni user
                var users = new List<AppUser>{
                    new AppUser{
                        DisplayName = "Altrit",
                        UserName = "altrit",
                        Email = "altritgallapeni@gmail.com",
                        IsConfirmed = true
                    },
                    new AppUser
                    {
                        DisplayName = "Shaban",
                        UserName = "shaban",
                        Email = "shabanmorina@gmail.com",
                        IsConfirmed = true
                    },
                    new AppUser
                    {
                        DisplayName = "Bexhet",
                        UserName = "bexhet",
                        Email = "bexhetberisha@gmail.com",
                        IsConfirmed = true
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(user, "Administrator");
                }
            }



            if (context.Students.Any()) return;

            var students = new List<Student>
            {
                new Student
                {
                    Name = "Altrit",
                    Surname = "Gallapeni",
                    Email = "altritgallapeni@gmail.com",
                    PhoneNumber = "+38349117407",
                    Street = "William Walker",
                    City = "Prizren",
                    State = "Kosovo",
                    Gender = "Male",
                    Nationality = "Albanian",
                    ParentName = "Hamit",
                    ParentEmail = "hamitgallapeni@gmail.com",
                    ParentPhoneNumber = "+383111111",
                    ParentStreet = "William Walker",
                    ParentCity = "Prizren",
                    ParentState = "Kosovo",
                    IsConfirmed = true
                },
                new Student
                {
                    Name = "Shaban",
                    Surname = "Morina",
                    Email = "shabanmorina@gmail.com",
                    PhoneNumber = "+38349555555",
                    Street = "William Walker",
                    City = "Prizren",
                    State = "Kosovo",
                    Gender = "Male",
                    Nationality = "Albanian",
                    ParentName = "Rrustem",
                    ParentEmail = "rrustemmorina@gmail.com",
                    ParentPhoneNumber = "+383222222",
                    ParentStreet = "William Walker",
                    ParentCity = "Prizren",
                    ParentState = "Kosovo",
                    IsConfirmed = true
                },
                new Student
                {
                    Name = "Bexhet",
                    Surname = "Berisha",
                    Email = "bexhetberisha@gmail.com",
                    PhoneNumber = "+3834999999",
                    Street = "Rruga 123",
                    City = "Suhareke",
                    State = "Kosovo",
                    Gender = "Male",
                    Nationality = "Albanian",
                    ParentName = "Bahri",
                    ParentEmail = "bahriberisha@gmail.com",
                    ParentPhoneNumber = "+383444444",
                    ParentStreet = "Rruga 123",
                    ParentCity = "Suhareke",
                    ParentState = "Kosovo",
                    IsConfirmed = true
                },
            };

            await context.Students.AddRangeAsync(students);
            await context.SaveChangesAsync();
        }
    }
}