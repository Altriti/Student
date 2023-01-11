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
        public async Task<IActionResult> SetGrade(GradeSubject grade)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Grade = grade }));
        }

        [HttpGet]
        public async Task<IActionResult> GetGrades(){
            return HandleResult(await Mediator.Send(new List.Query()));
        }
    }
}