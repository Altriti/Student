using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Timetables;
using Domain;

namespace API.Controllers
{
    public class TimetablesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetTimetables()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTimetable(string id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateTimetable(Timetable timetable)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Timetable = timetable }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> SetTimetable(string id, Timetable timetable)
        {
            timetable.Id = id;
            return HandleResult(await Mediator.Send(new Update.Command { Timetable = timetable }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTimetable(string id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}