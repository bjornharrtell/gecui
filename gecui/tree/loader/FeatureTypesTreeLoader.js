/**
 * @constructor
 */
gecui.tree.loader.FeatureTypesTreeLoader = function(config) {
    gecui.tree.loader.FeatureTypesTreeLoader.superclass.constructor.call(this, Ext.apply( {}, config));
};

Ext.extend(gecui.tree.loader.FeatureTypesTreeLoader, gecui.tree.TreeLoader, {
    createNode : function(attr) {
        attr.text = attr.name;
        attr.resturl = attr.href;
        delete attr.href;
        attr.xtype = 'gecui-featuretype';
        attr.iconCls = attr.xtype;
        attr.leaf = true;
        return gecui.tree.TreeLoader.prototype.createNode.call(this, attr);
    }
});
