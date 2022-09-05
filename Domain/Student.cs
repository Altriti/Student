using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Student
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Gender { get; set; }
        public string Nationality { get; set; }
        public string ParentName { get; set; }
        //parentsurname me shtu
        public string ParentEmail { get; set; }
        public string ParentPhoneNumber { get; set; }
        public string ParentStreet { get; set; }
        public string ParentCity { get; set; }
        public string ParentState { get; set; }

    }
}