using System;
using Microsoft.AspNetCore.Mvc;

namespace learn_databases_webapi_server.Services
{
    public interface IGetDatabaseValues
    {
        JsonResult getColumns(String databasename, String tableName);
         
    }
}