using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;

namespace learn_databases_webapi_server.Repository
{
    public class DatabaseRepository
    {
        private static readonly MySqlConnectionStringBuilder builder = new MySqlConnectionStringBuilder
        {
            Server = "learn-databases-mysql.mysql.database.azure.com",
            UserID = "learndatabases",
            Password = "ReadOnly!"
        };

        private static readonly HashSet<String> databaseNames = new HashSet<String>{
            "beerandwinepermit", "akcregistration", "catering","matchreport"
        };

        public JsonResult getTables(String databasename)
        {
            List<String> tables = new List<String>();

            if (!databaseNames.Contains(databasename.ToLowerInvariant())) {
                
                tables.Add("No such database name");
                return new JsonResult(tables);
            }


            builder.Database = databasename;

            using (var conn = new MySqlConnection(builder.ConnectionString))
            {
                Console.WriteLine("Opening connection");
                Console.WriteLine("Database Schema");
                conn.Open();

                using (var command = conn.CreateCommand())
                {
                    command.CommandText = "SHOW TABLES";

                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {


                            for (int i = 0; i < reader.FieldCount; i++)
                                tables.Add(reader.GetValue(i).ToString());
                        }
                    }
                }

                Console.WriteLine("Closing connection");
            }

            return new JsonResult(tables);

        }
    
        public JsonResult getColumns(String databasename, String tableName)
        {
            
            List<String> values = new List<String>();
            


            builder.Database = databasename;

            using (var conn = new MySqlConnection(builder.ConnectionString))
            {
                Console.WriteLine("Opening connection");
                Console.WriteLine("Database Table Values");
                conn.Open();

                using (var command = conn.CreateCommand())
                {
                    //Bound variable Bind tablename after specified command
                    command.CommandText = "SELECT table_Name,column_name,column_type,is_nullable,column_key from INFORMATION_SCHEMA.COLUMNS WHERE table_schema = @database AND table_name LIKE @table ORDER BY table_name, ORDINAL_POSITION";
                    command.Parameters.AddWithValue("@table", tableName);
                    command.Parameters.AddWithValue("@database", databasename);

                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            for (int i = 0; i < reader.FieldCount; i++)
                                values.Add(reader.GetValue(i).ToString());
                        }
                    }
                }

                Console.WriteLine("Closing connection");
            }

            return new JsonResult(values);

        }

/*
         public JsonResult getData(String databasename, String tableName)
        {
            
            List<String> values = new List<String>();
            


            builder.Database = databasename;

            using (var conn = new MySqlConnection(builder.ConnectionString))
            {
                Console.WriteLine("Opening connection");
                Console.WriteLine("Database Table Values");
                conn.Open();

                using (var command = conn.CreateCommand())
                {
                    //Bound variable Bind tablename after specified command
                    
                    command.CommandText = "SELECT * FROM table_Name";

                    SqlCommandBuilder cmdBuilder = new SqlCommandBuilder();
                    string tableName = cmdBuilder.QuoteIdentifier(table_Name);
                    
                    command.Parameters.AddWithValue("@table", tableName);
                    command.Parameters.AddWithValue("@database", databasename);

                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            for (int i = 0; i < reader.FieldCount; i++)
                                values.Add(reader.GetValue(i).ToString());
                        }
                    }
                }

                Console.WriteLine("Closing connection");
            }

            return new JsonResult(values);

        }
        */
        public JsonResult GetSchema()
        {
            return GetSchemaAsync().GetAwaiter().GetResult();
        }

        static async Task<JsonResult> GetSchemaAsync()
        {
            List<String> schemas = new List<String>();

            using (var conn = new MySqlConnection(builder.ConnectionString))
            {
                await conn.OpenAsync();

                using (var command = conn.CreateCommand())
                {
                    command.CommandText = "SELECT `schema_name` from INFORMATION_SCHEMA.SCHEMATA  WHERE `schema_name` NOT IN('information_schema', 'mysql', 'performance_schema', 'sys')";

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync()) 
                        {
                            for (int i = 0; i < reader.FieldCount; i++) 
                            {
                                schemas.Add(reader.GetValue(i).ToString());
                            }    
                        }
                    }
                }
            }

            return new JsonResult(schemas);
        }
    }   
}
