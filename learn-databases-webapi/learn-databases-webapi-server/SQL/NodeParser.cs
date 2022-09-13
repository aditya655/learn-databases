using System.Text.Json;



namespace learn_databases_webapi_server.SQL{







    public class NodeParser {
        

        public Node parse(string json){
            dynamic rootJson = JsonSerializer.Deserialize<dynamic>(json)!;
              Node root = nodeParse(rootJson);
              return root;
        }

        
        public Node nodeParse(dynamic obj){
              if(obj.type == "entity"){
                 return new EntityNode(obj.value,obj.alias);
              }
              else if(isUnary(obj.type)){
                    UnaryNode unary = new UnaryNode(obj.type, obj.expression);
                    unary.right = nodeParse(obj.right);
                    return unary;
              }

              else if(isBinary(obj.type)){
                    BinaryNode bin = new BinaryNode(obj.type, obj.expression);
                    bin.left = nodeParse(obj.left);
                    bin.right = nodeParse(obj.right);
                    return bin;
              }

              throw new System.Exception("Node not supported");

              
        }

        public bool isUnary(string type){
            if(type == "project"){
                return true;
            }
            return false;
        }

         public bool isBinary(string type){
            if(type == "theta_join"){
                return true;
            }
            return false;
        }

       

       }
}


    
