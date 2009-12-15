/**
 * @constructor
 */
gecui.node.WorkspacesNode = function(config) {
    gecui.node.WorkspacesNode.superclass.constructor.call(this, Ext.apply( {
        text : 'Workspaces',
        expanded : true,
        iconCls : 'gecui-workspaces',
        id : 'workspaces',
        loader : new gecui.treeloader.WorkspacesTreeLoader( {
            url : gecui.url,
            restful : true,
            applyLoader : false
        })
    }, config));
};

Ext.extend(gecui.node.WorkspacesNode, Ext.tree.AsyncTreeNode, {});
