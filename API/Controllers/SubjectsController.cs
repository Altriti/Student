using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Subjects;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SubjectsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetSubjects()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSubject(String id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateSubject(Subject subject)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Subject = subject }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSubject(String id, Subject subject)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Subject = subject }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubject(String id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}