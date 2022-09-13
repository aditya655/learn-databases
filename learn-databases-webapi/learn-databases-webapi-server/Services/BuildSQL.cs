using System;
using Microsoft.AspNetCore.Mvc;
using learn_databases_webapi_server.Repository;

namespace learn_databases_webapi_server.Services
{
    public class BuildSQL: IBuildSQL
    {
        private readonly DatabaseRepository databaseRepository = new DatabaseRepository();
         public JsonResult getSQL(string RA)
        {
            return null;
        }
    }
}