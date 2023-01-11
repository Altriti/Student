using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.StudentGrades;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class StudentGradesController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> CreateGrade(GradeSubject grade)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Grade = grade }));
        }

        [HttpGet]
        public async Task<IActionResult> GetGrades()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGrade(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGrade(Guid id, GradeSubject grade)
        {
            return HandleResult(await Mediator.Send(new Update.Command { Grade = grade }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGrade(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}