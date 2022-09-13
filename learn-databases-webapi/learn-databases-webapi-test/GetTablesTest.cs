using System;
using Xunit;
using Moq;
using Microsoft.AspNetCore.Mvc.Core;

using learn_databases_webapi_server.Services;
using learn_databases_webapi_server.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;

namespace learn_databases_webapi_test
{
    public class GetTablesTest
    {
        
        private Mock<IGetDatabaseTablesName> tables;

        private Mock<IGetDatabaseValues> values;
        private DatabaseController controller;

        
        [Fact]
        public void GetTablesValidTest()
        {
            List<String> schemas = new List<String>();
            
            schemas.Add("Test1");
            schemas.Add("Test2");
            schemas.Add("Test3");
            schemas.Add("Test3");
            schemas.Add("Test3");
            var data = new JsonResult(schemas);
            tables = new Mock<IGetDatabaseTablesName>(); 
            tables.Setup(names => names.getTables("beerandwinepermit")).Returns(data);

            

            controller = new DatabaseController(null,tables.Object  , null);

            var result = controller.Get("beerandwinepermit");

            Assert.Equal(data,result);
        

        }
        [Fact]
        public void GetTablesInValidTest()
        {
            List<String> schemas = new List<String>();
            
            schemas.Add("Test1");
            schemas.Add("Test2");
            schemas.Add("Test3");
            schemas.Add("Test3");
            schemas.Add("Test3");
            var data = new JsonResult(schemas);
            tables = new Mock<IGetDatabaseTablesName>(); 
            tables.Setup(names => names.getTables("beerandwinepermit"))
                .Returns(data);
            controller = new DatabaseController(null,tables.Object , null);

            var result = controller.Get("");
            BadRequestObjectResult actual = result as BadRequestObjectResult;

            Assert.NotEqual(data,result);
            var expected = new BadRequestObjectResult("Please input database name");
            Assert.Equal(expected.Value,actual.Value);
        

        }
    }
}
