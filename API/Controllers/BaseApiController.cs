using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        public IMediator _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result == null)
                return NotFound();
            if (result.IsSuccess && result.Value != null)//kur ka suskes dhe value nuk osht i zbrazt po kthen data(T(student, activity))
                return Ok(result.Value);
            if (result.IsSuccess && result.Value == null)//kur ka sukses po nuk kthen sen, e kthen null p.sh nese e lyp ni student me id gabim, kthen notFound sepse sun e gjen
                return NotFound();
            return BadRequest(result.Error);
        }
    }
}