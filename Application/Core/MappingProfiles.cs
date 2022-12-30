using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Classes;
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
            CreateMap<Subject, Subject>();
            CreateMap<Class, Class>();
            CreateMap<Class, ClassDto>();
            CreateMap<ClassProfessor, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Professor.Name))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.Professor.Email))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.Professor.Nationality));
        }
    }
}