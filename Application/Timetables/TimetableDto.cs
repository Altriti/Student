using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Timetables
{
    public class TimetableDto
    {
        public string Id { get; set; }
        public Guid ClassId { get; set; }
        public ICollection<WeekDayScheduleDto> WeekDaySchedules { get; set; }
    }

    public class WeekDayScheduleDto
    {
        public Guid WeekDayScheduleId { get; set; }
        public DayOfWeek Day { get; set; }
        public ICollection<ScheduleDto> Schedules { get; set; }

    }
    public class ScheduleDto
    {
        public Guid ScheduleId { get; set; }
        public string SubjectId { get; set; }
        public string Time { get; set; }
    }
}