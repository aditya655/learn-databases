namespace learn_databases_webapi_server.SQL{





    public class EntityNode: Node
    {
        private string alias;
        private string value;

        
          public EntityNode( string value, string alias): base("entity"){
       
            this.value = value;
            this.alias = alias;

    }

}
}