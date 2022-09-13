namespace learn_databases_webapi_server.SQL

{
    public class BinaryNode: Node{
                private string expression;

         public BinaryNode(string expression, string type) : base(type){
              
              this.expression = expression;

        }

        
    }
}