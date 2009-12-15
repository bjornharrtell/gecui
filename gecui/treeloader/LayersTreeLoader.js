/**
 * @constructor
 */
gecui.treeloader.LayersTreeLoader = function(config) {
    gecui.treeloader.LayersTreeLoader.superclass.constructor.call(this, Ext.apply( {}, config));
};

Ext.extend(gecui.treeloader.LayersTreeLoader, gecui.TreeLoader, {
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
