namespace learn_databases_webapi_server.SQL{




   public class Node{
           public Node left;
           public Node right;
           public string type;
          public Node(string type){
            
            this.type = type;
           

        }
         public bool isTable(){

            return false;
         }

         public bool isJoin(){

            return false;

         }

         public bool isSemiJoin(){

            return false;
            
         }

         public bool isSimple(){

            return false;
            
         }

         public bool hasAlias(){
            return false;
         }

         public  const string NODE_SEMI_JOIN_LEFT = "semi_join_left";
         public  const string NODE_SEMI_JOIN_RIGHT = "semi_join_right";
         public  const string NODE_OUTER_JOIN_LEFT = "outer_join_left";
         public  const string NODE_OUTER_JOIN_RIGHT = "outer_join_right";
         public  const string NODE_OUTER_JOIN_FULL = "outer_join_full";
         public  const string NODE_THETA_JOIN = "theta_join";
         public  const string NODE_ENTITY = "entity";
         public  const string NODE_PROJECT = "project";
         public  const string NODE_RESTRICT = "restrict";
         public  const string NODE_AGGREGATE = "aggregate";
         public  const string NODE_CARTESIAN_PRODUCT = "cartesian_product";
         public  const string NODE_DIVISION = "division";
         public  const string NODE_UNION = "union";
         public  const string NODE_INTERSECTION = "intersection";
         public  const string NODE_DIFFERENCE = "difference";
         public  const string NODE_ALIAS = "alias";






   }

  


}
