/**
 * @constructor
 */
gecui.node.Workspaces = function(config) {
    gecui.node.Workspaces.superclass.constructor.call(this, Ext.apply( {
        text : 'Workspaces',
        expanded : true,
        xtype: 'gecui-workspaces',
        iconCls : 'gecui-workspaces',
        id : 'workspaces',
        loader : new gecui.treeloader.Workspaces( {
            url : gecui.url,
            restful : true,
            applyLoader : false
        })
    }, config));
};

Ext.extend(gecui.node.Workspaces, Ext.tree.AsyncTreeNode, {});
