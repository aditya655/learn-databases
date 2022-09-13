import React from 'react';
import { ExpandMore } from '@material-ui/icons';
import { ChevronRight } from '@material-ui/icons';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import TablesPage from './SchemaTables';

const SchemaTree = (table) => {
        
    const list = table.children.toString();
    return (
        <TreeView
            aria-label="rich object"
            defaultCollapseIcon={<ExpandMore />}
            defaultExpandIcon={<ChevronRight />}
            multiSelect
            sx={{ height: 215, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>
                 
            <TreeItem style={{ color: '#031259', fontWeight: 'bold', fontSize: "21px" }} nodeId="1" label={list}>
                <TablesPage databaseName={list}></TablesPage>
            </TreeItem>
        </TreeView>
            
    );
}
 
export default SchemaTree;