/**
 * @constructor
 */
gecui.tree.loader.WorkspacesTreeLoader = function(config) {
    gecui.tree.loader.WorkspacesTreeLoader.superclass.constructor.call(this, Ext.apply( {}, config));
};

Ext.extend(gecui.tree.loader.WorkspacesTreeLoader, gecui.tree.TreeLoader, {
    createNode : function(attr) {
        var workspaceName = attr.name;
        attr.text = workspaceName;
        attr.resturl = attr.href;
        delete attr.href;
        attr.id = 'workspaces/' + workspaceName + '/datastores';
        attr.xtype = 'gecui-workspace';
        attr.iconCls = attr.xtype;
        attr.loader = new gecui.tree.loader.DataStoresTreeLoader( {
            url : gecui.url,
            restful : true,
            applyLoader : false,
            workspaceName: workspaceName
        });
        return gecui.tree.TreeLoader.prototype.createNode.call(this, attr);
    }
});
