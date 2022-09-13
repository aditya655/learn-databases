namespace learn_databases_webapi_server.SQL
{
    public class UnaryNode: Node{
            private string expression;

         public UnaryNode(string expression,string type) : base(type){
           
            this.expression = expression;
            

        }
        
        

    }
}