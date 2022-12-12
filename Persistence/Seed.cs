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

            if (!roleManager.RoleExistsAsync("Professor").Result)
            {
                var role = new IdentityRole
                {
                    Name = "Professor"
                };
                await roleManager.CreateAsync(role);
            }




            if (!userManager.Users.Any())
            {//ne ska asni user
                var studentUsers = new List<AppUser>
                {
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
                    },
                };

                var professorUsers = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Rick",
                        UserName = "rick",
                        Email = "rick@student.com",
                        IsConfirmed = true
                    },
                    new AppUser
                    {
                        DisplayName = "Morty",
                        UserName = "morty",
                        Email = "morty@student.com",
                        IsConfirmed = true
                    },
                    new AppUser
                    {
                        DisplayName = "Summer",
                        UserName = "summer",
                        Email = "summer@student.com",
                        IsConfirmed = true
                    }
                };

                foreach (var studentUser in studentUsers)
                {
                    await userManager.CreateAsync(studentUser, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(studentUser, "Administrator");
                };

                foreach (var professorUser in professorUsers)
                {
                    await userManager.CreateAsync(professorUser, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(professorUser, "Professor");
                };
            }






            if (context.Students.Any() && context.Professors.Any()
                && context.Subjects.Any() && context.Classes.Any()) return;

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


            var professors = new List<Professor>
            {
                new Professor
                {
                    Name = "Peter",
                    Surname = "Griffin",
                    Email = "peter@gmail.com",
                    PhoneNumber = "+383222222",
                    Street = "Spooner Street",
                    City = "Quahog",
                    State = "USA",
                    Gender = "Male",
                    Nationality = "American"
                },
                new Professor
                {
                    Name = "Lois",
                    Surname = "Griffin",
                    Email = "lois@gmail.com",
                    PhoneNumber = "+383333333",
                    Street = "Spooner Street",
                    City = "Quahog",
                    State = "USA",
                    Gender = "Female",
                    Nationality = "American"
                },
                new Professor
                {
                    Name = "Stewie",
                    Surname = "Griffin",
                    Email = "stewie@gmail.com",
                    PhoneNumber = "+383444444",
                    Street = "Spooner Street",
                    City = "Quahog",
                    State = "USA",
                    Gender = "Male",
                    Nationality = "American"
                },
            };

            var subjects = new List<Subject>
            {
                new Subject
                {
                    Id = "1",
                    Name = "Math"
                },
                new Subject
                {
                    Id = "2",
                    Name = "Chem"
                },
                new Subject
                {
                    Id = "3",
                    Name = "Eng"
                }
            };

            var classes = new List<Class>
            {
                new Class
                {
                    ClassName = "10"
                },
                new Class
                {
                    ClassName = "11"
                },
                new Class
                {
                    ClassName = "12"
                }
            };

            await context.Students.AddRangeAsync(students);
            await context.Professors.AddRangeAsync(professors);
            await context.Subjects.AddRangeAsync(subjects);
            await context.Classes.AddRangeAsync(classes);
            await context.SaveChangesAsync();
        }
    }
}