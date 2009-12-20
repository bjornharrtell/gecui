/**
 * @constructor
 */
gecui.treeloader.FeatureTypes = function(config) {
    gecui.treeloader.FeatureTypes.superclass.constructor.call(this, Ext.apply( {}, config));
};

Ext.extend(gecui.treeloader.FeatureTypes, gecui.TreeLoader, {
    createNode : function(attr) {
        attr.text = attr.name;
        attr.resturl = attr.href;
        delete attr.href;
        attr.xtype = 'gecui-featuretype';
        attr.iconCls = attr.xtype;
        attr.leaf = true;
        return gecui.TreeLoader.prototype.createNode.call(this, attr);
    }
});
