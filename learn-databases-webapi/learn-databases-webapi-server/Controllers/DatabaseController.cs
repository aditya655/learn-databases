using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using learn_databases_webapi_server.Repository;
using learn_databases_webapi_server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace learn_databases_webapi_server.Controllers
{
    
    [ApiController]
    [Route("[controller]")]
    public class DatabaseController :ControllerBase
    {
        private readonly IGetDatabaseTablesName getDatabaseTablesNameService;
        private readonly IGetDatabaseValues getDatabaseValuesService;
        private readonly IGetDatabaseSchema getDatabaseSchema;
        private readonly ILogger<DatabaseController> _logger;

        private readonly DatabaseRepository databaseRepository = new DatabaseRepository();

        public DatabaseController(ILogger<DatabaseController> logger, IGetDatabaseTablesName tablenames, IGetDatabaseValues valuenames)
        {
            _logger = logger;
            getDatabaseTablesNameService = tablenames;
            getDatabaseValuesService = valuenames;
            getDatabaseSchema = new GetDatabaseSchema();
        }


        [HttpGet]
        [Route("schema")]
        public IActionResult Get()
        {
            
            return getDatabaseSchema.GetSchema();
        }

        [HttpGet]
        [Route("schema/{databasename}")]
        public ActionResult Get(String databasename) 
        {
            
            if (databasename.Length == 0 || databasename == null) 
            {
                return BadRequest("Please input database name");
            }

            return getDatabaseTablesNameService.getTables(databasename);
        }

        [HttpGet]
        [Route("schema/{databasename}/{tablename}")]
        public ActionResult Get(String databasename, String tablename) 
        
        {
            if (databasename.Length == 0 || databasename == null) 
            {
                return BadRequest("Please input database name");
            }
            if (tablename.Length == 0 || tablename == null) 
            {
                return BadRequest("Please input table name");
            }
            Console.WriteLine(databasename+" "+ tablename);
            return getDatabaseValuesService.getColumns(databasename, tablename);
        }
    }
}