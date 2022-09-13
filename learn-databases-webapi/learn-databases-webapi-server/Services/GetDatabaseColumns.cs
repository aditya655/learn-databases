using learn_databases_webapi_server.Repository;
using Microsoft.AspNetCore.Mvc;

namespace learn_databases_webapi_server.Services
{
    public class GetDatabaseValues: IGetDatabaseValues
    {
        
        private readonly DatabaseRepository databaseRepository = new DatabaseRepository();


        public JsonResult getColumns(string databasename, string tableName)
        {
            return databaseRepository.getColumns(databasename, tableName);
        }
    }
}