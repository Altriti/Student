using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Students;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class StudentsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetStudents()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetStudentById(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }


        [HttpPost]
        public async Task<IActionResult> CreateStudent(Student student)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Student = student }));
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> EditStudent(Guid id, Student student)
        {
            student.Id = id;//nese studenti vjen pa id se jo me qdo kusht vjen em id, ktu qajo id i bohet njejt me id qe e ka pas ndatabaz se qishtu duhet per mos me pas error
            return HandleResult(await Mediator.Send(new Edit.Command { Student = student }));
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}