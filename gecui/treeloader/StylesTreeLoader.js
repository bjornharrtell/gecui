/**
 * @constructor
 */
gecui.treeloader.StylesTreeLoader = function(config) {
    gecui.treeloader.StylesTreeLoader.superclass.constructor.call(this, Ext.apply( {}, config));
};

Ext.extend(gecui.treeloader.StylesTreeLoader, gecui.TreeLoader, {
    createNode : function(attr) {
        attr.text = attr.name;
        attr.resturl = attr.href;
        delete attr.href;
        attr.xtype = 'gecui-style';
        attr.iconCls = attr.xtype;
        attr.leaf = true;
        return gecui.TreeLoader.prototype.createNode.call(this, attr);
    }
});
