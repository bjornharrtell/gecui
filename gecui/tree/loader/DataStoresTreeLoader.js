/**
 * @constructor
 * @param config
 * @param config.workspaceName workspace name used to create valid data store urls
 */
gecui.tree.loader.DataStoresTreeLoader = function(config) {
    gecui.tree.loader.DataStoresTreeLoader.superclass.constructor.call(this, Ext.apply( {}, config));
};

Ext.extend(gecui.tree.loader.DataStoresTreeLoader, gecui.tree.TreeLoader, {
    createNode : function(attr) {
        attr.text = attr.name;
        attr.resturl = attr.href;
        delete attr.href;
        attr.xtype = 'gecui-datastore';
        attr.iconCls = attr.xtype;
        attr.id = 'workspaces/' + this.workspaceName + '/datastores/' + attr.name + '/featuretypes';
        attr.loader = new gecui.tree.loader.FeatureTypesTreeLoader( {
            url : gecui.url,
            restful : true
        });
        return gecui.tree.TreeLoader.prototype.createNode.call(this, attr);
    }
});
