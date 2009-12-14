/**
 * @constructor
 */
gecui.node.WorkspacesNode = function(config) {
    gecui.node.WorkspacesNode.superclass.constructor.call(this, Ext.apply( {
        text : 'Workspaces',
        xtype : 'gecui-workspaces',
        iconCls : 'gecui-workspaces',
        id : 'workspaces',
        expanded : true,
        loader : new gecui.tree.loader.WorkspacesTreeLoader( {
            url : gecui.url,
            restful : true,
            applyLoader : false
        })
    }, config));
};

Ext.extend(gecui.node.WorkspacesNode, Ext.tree.AsyncTreeNode, {});
