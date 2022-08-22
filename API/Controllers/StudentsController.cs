using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Students;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class StudentsController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Student>>> GetStudents()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudentById(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateStudent(Student student)
        {
            return Ok(await Mediator.Send(new Create.Command { Student = student }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditStudent(Guid id, Student student)
        {
            student.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Student = student }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}