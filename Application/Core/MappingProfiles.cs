using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Classes;
using Application.Professors;
using Application.StudentGrades;
using Application.Students;
using Application.Timetables;
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
            // CreateMap<ClassSubject, Subject>();
            //     .ForMember(d => d.Id, o => o.MapFrom(s => s.SubjectId))
            //     .ForMember(d => d.Name, o => o.MapFrom(s => s.Subject.Name));

            CreateMap<ClassSubject, SubjectDto.SubjectDto>()
                .ForMember(s => s.Id, o => o.MapFrom(c => c.SubjectId))
                .ForMember(s => s.Name, o => o.MapFrom(c => c.Subject.Name));

            CreateMap<Professor, ProfessorDto>();

            CreateMap<GradeSubject, GradeSubjectDto>();
            CreateMap<Student, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Name))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.Email))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.Nationality));
            
            CreateMap<Student, StudentDto>();

            CreateMap<Subject, SubjectDto.SubjectDto>();

            CreateMap<GradeSubject, StudentGradesDto>();

            CreateMap<GradeSubject, GradeSubject>();

            CreateMap<Timetable, TimetableDto>();
            CreateMap<WeekDaySchedule, WeekDayScheduleDto>();
            CreateMap<Schedule, ScheduleDto>();
            CreateMap<TimetableDto, Timetable>();
            CreateMap<WeekDayScheduleDto, WeekDaySchedule>();
            CreateMap<ScheduleDto, Schedule>();

        }
    }
}