/**
 * @constructor
 */
gecui.treeloader.Workspaces = function(config) {
    gecui.treeloader.Workspaces.superclass.constructor.call(this, Ext.apply( {}, config));
};

Ext.extend(gecui.treeloader.Workspaces, gecui.TreeLoader, {
    createNode : function(attr) {
        var workspaceName = attr.name;
        attr.text = workspaceName;
        attr.resturl = attr.href;
        delete attr.href;
        attr.id = 'workspaces/' + workspaceName + '/datastores';
        attr.xtype = 'gecui-workspace';
        attr.iconCls = attr.xtype;
        attr.loader = new gecui.treeloader.DataStores( {
            url : gecui.url,
            restful : true,
            applyLoader : false,
            workspaceName: workspaceName
        });
        return gecui.TreeLoader.prototype.createNode.call(this, attr);
    }
});
