using System;
using Microsoft.AspNetCore.Mvc;

namespace learn_databases_webapi_server.Repository
{
    public interface IDatabaseRepository
    {
        JsonResult getTables(
            String databasename);

        JsonResult GetSchema();
    }
}
