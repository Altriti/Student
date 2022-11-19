using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Professors;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfessorsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetProfessors()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetProfessorById(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }


        [HttpPost]
        public async Task<IActionResult> CreateProfessor(Professor professor)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Professor = professor }));
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> EditProfessor(Professor professor, Guid id)
        {
            professor.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Professor = professor }));
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProfessor(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}