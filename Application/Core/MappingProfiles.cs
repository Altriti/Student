using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {    
            CreateMap<Student, Student>().ForMember(x => x.AppUser, y => y.Ignore());
            CreateMap<Professor, Professor>().ForMember(x => x.AppUser, y => y.Ignore());
        }
    }
}