/**
 * @constructor
 */
gecui.tree.loader.LayersTreeLoader = function(config) {
    gecui.tree.loader.LayersTreeLoader.superclass.constructor.call(this, Ext.apply( {}, config));
};

Ext.extend(gecui.tree.loader.LayersTreeLoader, gecui.tree.TreeLoader, {
    createNode: function(attr) {
        attr.text = attr.name;
        attr.resturl = attr.href;
        delete attr.href;
        attr.xtype = 'gecui-layer';
        attr.iconCls = attr.xtype;
        attr.leaf = true;
        return gecui.tree.TreeLoader.prototype.createNode.call(this, attr);
    }
});
