/**
 * @constructor
 * @param config
 * @param config.workspaceName workspace name used to create valid data store urls
 */
gecui.treeloader.DataStoresTreeLoader = function(config) {
    gecui.treeloader.DataStoresTreeLoader.superclass.constructor.call(this, Ext.apply( {}, config));
};

Ext.extend(gecui.treeloader.DataStoresTreeLoader, gecui.TreeLoader, {
    createNode : function(attr) {
        attr.text = attr.name;
        attr.resturl = attr.href;
        delete attr.href;
        attr.xtype = 'gecui-datastore';
        attr.iconCls = attr.xtype;
        attr.id = 'workspaces/' + this.workspaceName + '/datastores/' + attr.name + '/featuretypes';
        attr.loader = new gecui.treeloader.FeatureTypesTreeLoader( {
            url : gecui.url,
            restful : true
        });
        return gecui.TreeLoader.prototype.createNode.call(this, attr);
    }
});
