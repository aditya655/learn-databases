


using System.Collections.Generic;

namespace learn_databases_webapi_server.SQL{

public class RelationalSQLGenerator{

public Dictionary<string,string> options;


    const string SQL_SELECT = "SELECT";
    const string SQL_FROM = "FROM";
    const string SQ_LALIAS = "AS";
    const string SQL_LIKE  = "LIKE";
   const string SQL_distinct = "DISTINCT";
    const string SQLtheta_join = "JOIN";
    const string SQLouter_join_left = "LEFT JOIN";
    const string SQLouter_join_right = "RIGHT JOIN";
   const string SQLouter_join_full = "FULL JOIN";
   const string SQLunion = "UNION";
   const string SQLrestrict ="WHERE";
   const string SQLcorrelation = "ON";
  const string  SQLlogical_and = "AND";
  const string  SQLlogical_or = "OR";
   const string SQLgroup_by = "GROUP BY";
   const string SQLorder_by = "ORDER BY";
  const string  SQLin_clause = "IN";
   const string SQLconditional_equals = "=";
   const string SQLconditional_not_equals = "<>";
   const string SQLleft_parenthesis = "(";
   const string SQLright_parenthesis = ")";



    //constructor() {
       // this.options = [];
  //  }

    public void addFromClause(Dictionary<string,string> clauses, string sql, string delim = ",") {
        if ( !clauses.ContainsKey("FROM"))
            clauses["FROM"] = sql;
        else
            clauses["FROM"] += delim+sql;
    }

   public  void addSelectClause(Dictionary<string,string> clauses, string sql) {
        if ( !clauses.ContainsKey("SELECT"))
            clauses["SELECT"] = SQL_distinct + " " + sql;
        else
            clauses["SELECT"] += ","+sql;
    }

   public void addWhereClause(Dictionary<string,string> clauses, string sql) {
        if ( !clauses.ContainsKey("WHERE"))
            clauses["WHERE"] += " " + SQLlogical_and + " ";
        clauses["WHERE"] += SQLleft_parenthesis + sql + SQLright_parenthesis;
    }

 public string buildCartesianProduct(Node node) {
        string sql = " ";
        if (node.left.isTable()) {
            sql += this.buildTable(node.left);
        }
        else {
            sql += SQLleft_parenthesis;
            sql += this.buildSelectStatement(node.left);
            sql += SQLright_parenthesis;
        }
        sql += ",";
        if (node.right.isTable()) {
            sql += this.buildTable(node.right);
        }
        else {
            sql += SQLleft_parenthesis;
            sql += this.buildSelectStatement(node.right);
            sql += SQLright_parenthesis;
        }
        return sql;
    }
/*
    buildColumnRef($column) {
        sql = $column.column;
        if (isset($column.table))
            sql = $column.table+'.'+sql;
        return sql;
    }

    buildCondition($condition) {
        sql = this.buildColumnRef($condition.left);
        sql += $condition.operator;
        sql += this.buildColumnRef($condition.right);
        return sql;
    }
*/
   public string buildExpression(string expression) {
        return expression;
    }

  public  string buildJoinOn(string expression) {
        string sql = " ";
        string delim = " " + SQLcorrelation + " ";
        sql += delim + expression;
        return sql;
    }

   public string buildJoinType(Node node) {
     Dictionary<string,string> clauses = new Dictionary<string,string>();
        while ( node != null) {
      switch(node.type){
    case SQLtheta_join:
    case SQLouter_join_left:
    case  SQLouter_join_right:
    case  SQLouter_join_full:
      }
        //return SQLSymbols[node.type];
    }
    return " ";
   }


  public string buildJoin(Dictionary<string,string> clauses, Node node) {
        string sql = " ";
        if (node.left.isTable()) {
            sql += this.buildTable(node.left);
        }
        else if (node.left.isJoin()) {
            sql += SQLleft_parenthesis;
            sql += this.buildJoin(clauses,node.left);
            sql += SQLright_parenthesis;
        }
        else if (node.left.isSemiJoin()) {
            this.buildSimple(clauses, node.left);
        }
        else {
            sql += SQLleft_parenthesis;
            sql += this.buildSelectStatement(node.left);
            sql += SQLright_parenthesis;
        }
        sql += " " + this.buildJoinType( node) + " ";
        if (node.right.isTable()) {
            sql += this.buildTable(node.right);
        }
        else if (node.right.isJoin()) {
            sql += SQLleft_parenthesis;
            sql += this.buildJoin(clauses,node.right);
            sql += SQLright_parenthesis;
        }
        else if (node.right.isSimple()) {
            this.buildSimple(clauses,node.right);
        }
        else if (node.right.isSemiJoin()) {
            sql += this.buildTable(node.left);
            this.addWhereClause(clauses,this.buildSemiJoinIn(node.right));
        }
        else {
            sql += SQLleft_parenthesis;
            sql += this.buildSelectStatement(node.right);
            sql += SQLright_parenthesis;
        }
        sql += this.buildJoinOn( node.expression);
        return sql;
    }

   public string buildSelectList(string expression) {
        return expression;
    }

   public string buildSelectStatement(Node node) {

        // Build Clauses
        Dictionary<string,string> clauses = new Dictionary<string,string>();
        while ( node != null) {
            switch ( node.type) {
                case Node.NODE_PROJECT:
                    this.addSelectClause(clauses,this.buildSelectList( node.expression));
                     node = node.right;
                    break;
                case Node.NODE_RESTRICT:
                    this.addWhereClause(clauses,this.buildExpression( node.expression));
                     node = node.right;
                    break;
                case Node.NODE_ENTITY:
                    this.addFromClause(clauses,this.buildTable( node));
                    node = null;
                    break;
                case Node.NODE_OUTER_JOIN_FULL:
                case Node.NODE_OUTER_JOIN_LEFT:
                case Node.NODE_OUTER_JOIN_RIGHT:
                case Node.NODE_THETA_JOIN:
                    this.addFromClause(clauses,this.buildJoin(clauses, node), " ");
                    node = null;
                    break;
                case Node.NODE_CARTESIAN_PRODUCT:
                    this.addFromClause(clauses,this.buildCartesianProduct(node), " ");
                    node = null;
                    break;
                case Node.NODE_SEMI_JOIN_LEFT:
                    this.addWhereClause(clauses,this.buildSemiJoinIn( node));
                     node = null;
                    break;
                //default:
                    //throw "Cannot build SQL for " +  node.type + "  nodes yet.";
            }
        }

        // Assemble Clauses
        if (!clauses.ContainsKey("SELECT"))
            clauses["SELECT"] = SQL_distinct + "*";
        string sql = " ";
        string delim = " ";
        string default_delim = " ";
        if ( this.options["pretty"] != "undefined") {
                default_delim = "\n";
            }
       
        if  (clauses.ContainsKey("SELECT")  ) {
                sql += delim + "SELECT" + " " + clauses["SELECT"];
                delim = default_delim;
            }
        if  (clauses.ContainsKey("FROM")  ) {
                sql += delim + "FROM" + " " + clauses["FROM"];
                delim = default_delim;
            }
        if  (clauses.ContainsKey("WHERE") ) {
                sql += delim + "WHERE" + " " + clauses["WHERE"];
                delim = default_delim;
            }

        if  (clauses.ContainsKey("GROUP BY") ) {
                sql += delim + "GROUP BY" + " " + clauses["GROUP BY"];
                delim = default_delim;
            }

        if  (clauses.ContainsKey("HAVING") ) {
                sql += delim + "HAVING" + " " + clauses["HAVING"];
                delim = default_delim;
            }

        if  (clauses.ContainsKey("ORDER BY") ) {
                sql += delim + "ORDER BY" + " " + clauses["ORDER BY"];
                delim = default_delim;
            }
            
        

        // Return Final Result;
        return sql;
    }

   public string buildSemiJoin(Dictionary<string,string> clauses, Node node) {
        this.addFromClause(clauses, this.buildTable(node.left));
        string sql = buildSemiJoinIn( node);
        return sql;
    }

  public  string buildSemiJoinIn(Node node) {
        string sql = " ";
        sql += SQLleft_parenthesis + node.expression + SQLright_parenthesis;
        /*
        char conditions = Node node.expression.arguments;
        char delim = (sizeof($conditions) == 1) ? " " : SQLleft_parenthesis;
        foreach ($conditions as $condition) {
            sql += delim+this.buildColumnRef($condition.left);
            delim = ',';
        }
        delim = (sizeof($conditions) == 1) ? " " : SQLright_parenthesis;
        sql += delim + " " + SQLSymbols['in'] + " " + SQLleft_parenthesis;
        operand = " ";
        delim = " ";
        foreach ($conditions as $condition) {
            operand += delim+this.buildColumnRef($condition.right);
            delim = ',';
        }
        $projection = new RAMProjection(node.right, operand);
        sql += this.buildSelectStatement($projection);
        sql += SQLright_parenthesis;

         */
        return sql;

    }

   public void buildSimple(Dictionary<string,string> clauses,Node node) {
        while ( node != null) {
            switch ( node.type) {
                case Node.NODE_PROJECT:
                    this.addSelectClause(clauses,this.buildSelectList( node.expression));
                     node = node.right;
                    break;
                case Node.NODE_RESTRICT:
                    this.addWhereClause(clauses,this.buildExpression( node.expression));
                     node = node.right;
                    break;
                case Node.NODE_ENTITY:
                    this.addFromClause(clauses,this.buildTable( node));
                     node = null;
                    break;
                //default:
                  //  throw  "Cannot build simple SQL for " +  node.type + "  nodes yet.";
            }
        }
    }

   public string buildTable(Node node) {
        if (!node.isTable()) {
           // console.log("Expected Entity: ");
            //console.log(JSON.stringify( node));
           // throw "RA:Expected entity Node node";
        }
        if ( node.hasAlias())
            return  node.value + " " +  node.alias;
        return  node.value;
    }

}
}
//exports.RelationalSQLGenerator = RelationalSQLGenerator;


