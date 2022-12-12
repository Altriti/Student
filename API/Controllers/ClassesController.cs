using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Classes;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ClassesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetClasses()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetClassById(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateClass(Class classR)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Class = classR }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditClass(Guid id, Class classR)
        {
            classR.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Class = classR }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClass(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}