using learn_databases_webapi_server.Repository;
using Microsoft.AspNetCore.Mvc;

namespace learn_databases_webapi_server.Services
{
    public class GetDatabaseSchema : IGetDatabaseSchema
    {
        private readonly DatabaseRepository databaseRepository = new DatabaseRepository();

        public JsonResult GetSchema()
        {
            return databaseRepository.GetSchema();
        }
    }
}
