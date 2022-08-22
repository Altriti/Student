using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Students.Any()) return;
            
            var activities = new List<Student>
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
                },
            };

            await context.Students.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}