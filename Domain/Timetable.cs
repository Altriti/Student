using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Timetable
    {
        public string Id { get; set; }
        public Guid ClassId { get; set; }
        public Class Class { get; set; }
        public ICollection<WeekDaySchedule> WeekDaySchedules { get; set; }
    }

    public class WeekDaySchedule
    {
        public Guid WeekDayScheduleId { get; set; }
        public DayOfWeek Day { get; set; }
        public ICollection<Schedule> Schedules { get; set; }

    }
    public class Schedule
    {
        public Guid ScheduleId { get; set; }
        public string SubjectId { get; set; }
        public Subject Subject { get; set; }
        public string Time { get; set; }
    }
}