using System;
using Microsoft.AspNetCore.Mvc;

namespace learn_databases_webapi_server.Services
{
    public interface IGetDatabaseSchema
    {
         JsonResult GetSchema();
    }
}
