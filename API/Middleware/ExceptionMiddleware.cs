using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Core;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger,
            IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);//E kthen EDO RESPONSE, QDO error, qdo joerror(p.sh kthen userdto afet login).kthen Result edhe nese osht Success ose Failure. Dmth kthen gjithqka prej edit,delete,create... perveq ato qe kthejne exceptions si(delete me id gabim). Gjithashtu kthen qdo error, edhe buggyController errors(notfound....)
            }
            catch (Exception ex)//E kthen qdo exception prej atyne qe nuk i kthen next i kthen kjo p.sh. kur e bon add tnjejtin student ose kur e delete ni student me id gabim. E kthen ni AppException
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = _env.IsDevelopment()
                    ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                    : new AppException(context.Response.StatusCode, "Server Error");

                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}