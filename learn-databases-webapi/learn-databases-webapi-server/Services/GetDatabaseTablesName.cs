using learn_databases_webapi_server.Repository;
using Microsoft.AspNetCore.Mvc;

namespace learn_databases_webapi_server.Services
{
    public class GetDatabaseTablesName: IGetDatabaseTablesName
    {
        private readonly DatabaseRepository databaseRepository = new DatabaseRepository();


        public JsonResult getTables(string databasename)
        {
            return databaseRepository.getTables(databasename);
        }
    }
}