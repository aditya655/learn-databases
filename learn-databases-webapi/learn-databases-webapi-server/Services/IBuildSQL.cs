using System;
using Microsoft.AspNetCore.Mvc;

namespace learn_databases_webapi_server.Services
{
    public class IBuildSQL
    {
         public interface IGetSQLValues
       {
           JsonResult getSQL(string RA);
         
       }
    }
}