/**
 * @constructor
 */
gecui.treeloader.Layers = function(config) {
    gecui.treeloader.Layers.superclass.constructor.call(this, Ext.apply( {}, config));
};

Ext.extend(gecui.treeloader.Layers, gecui.TreeLoader, {
    createNode: function(attr) {
        attr.text = attr.name;
        attr.resturl = attr.href;
        delete attr.href;
        attr.xtype = 'gecui-layer';
        attr.iconCls = attr.xtype;
        attr.leaf = true;
        return gecui.TreeLoader.prototype.createNode.call(this, attr);
    }
});
